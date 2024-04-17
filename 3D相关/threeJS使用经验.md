# threeJS 使用经验

1. 点击 mesh 后隐藏和显示, 通过不同 layer 来达到目的，如果只有一层，隐藏后还会响应点击事件，所以要通过两层来达到目的

```javascript
mesh.visible = visible
if (visible) {
    mesh.layers.disable(1) // 如果还是一层，会响应点击等事件，所以不可见时，要置为不同层
    mesh.layers.enable(0)
} else {
    mesh.layers.disable(0)
    mesh.layers.enable(1)
}
```

2. 获取 mesh 边界

```javascript
const instanceGeo = mesh.geometry.clone()
mesh.updateMatrix()
instanceGeo.applyMatrix4(instancedData[instanceId].matrix)
instanceGeo.computeBoundingSphere()
instanceGeo.computeBoundingBox()
instanceGeo.computeBoundingBox()
const boundingBox = instanceGeo.boundingBox
const boundingSphere = instanceGeo.boundingSphere
return { boundingBox, boundingSphere }
```

3. 对于同一种模型，数量特别多的场景，可以使用 InstancedMesh 优化性能，一个 geo，多个 material，如果显示的数量有变化，可能存在前面几个隐藏，后面显示的情况，可先调整数据列表，把需要显示的放在前面，隐藏的放在后面，然后遍历数据列表，逐个更新 instancedMesh 的 matrix，最后通过 count 控制显示的数量

赋予 instanceMesh 中的每个 instance 不通的纹理：https://codepen.io/Hayawen/pen/YzPyVqm?editors=0010

大量 mesh 为啥要用 instancemesh/mergeGeometry，解释原理：https://velasquezdaniel.com/blog/rendering-100k-spheres-instantianing-and-draw-calls/

4. 如果某一个场景是由多个子模型组合而成的，且对子模型无任务交互，可以把子模型合并成一个大模型，减少定点数，优化性能

```javascript
function merge(object) {
    const geometries = []
    const matArr = []
    object.traverse((obj) => {
        const child = obj
        if (child.isMesh) {
            const geo = child.geometry.clone()
            child.material.length
                ? matArr.push(...child.material)
                : matArr.push(child.material)
            geo.index = null
            child.updateWorldMatrix(true, true)
            geo.applyMatrix4(child.matrixWorld)
            geometries.push(geo)
        }
    })

    const bufferGeo = mergeBufferGeometries(geometries, true)
    return { bufferGeo, matArr }
}
```

5. 获取模型中心

```javascript
function getSphereCenter(mesh: Object3D) {
    const instanceGeo = mesh.geometry.clone()
    mesh.updateMatrix()
    instanceGeo.applyMatrix4(mesh.matrix)
    instanceGeo.computeBoundingSphere()
    const boundingSphere = instanceGeo.boundingSphere
    return boundingSphere.center
}
```

5. 计算到 camera 的距离

```javascript
function computeDistanceFromCamera(target: Vector3, camera) {
    const cameraPosition = camera.position.clone()
    return cameraPosition.distanceTo(target)
}
```

6. 将矩阵进行分解，得到矩阵的位置、缩放和旋转信息，可以用于进一步处理和操作矩阵的各个部分

```javascript
function decomposeMatrix(
    matrix: Matrix4
): { position: any, scale: any, quaternion: any } {
    const position = new Vector3()
    const scale = new Vector3()
    const quaternion = new Quaternion()
    matrix.decompose(position, quaternion, scale)
    return {
        position,
        scale,
        quaternion,
    }
}
```

7. 将屏幕坐标转换为世界坐标。

```javascript
function convert2WorldCoordinate({ x, y, camera, canvas }: { x; y; camera; canvas; }): void {
    const left = canvas.getBoundingClientRect().left;
    const top = canvas.getBoundingClientRect().top;
    const clientX = x - left;
    const clientY = y - top;
    const mouse = new Vector2();
    mouse.x = (clientX / canvas.offsetWidth) * 2 - 1;
    mouse.y = -(clientY / canvas.offsetHeight) * 2 + 1;
    const raycaster = new Raycaster();
    raycaster.setFromCamera(mouse, camera);
}
```

8. 3D 模型世界坐标转换为二维屏幕坐标

```javascript
function convert2ScreenCoordinateFromPosition({ position, camera, canvas }: { position; camera; canvas; }): { x: number; y: number; } {
    // get the normalized screen coordinate of that position
    camera.updateMatrixWorld();
    position.project(camera);
    // convert the normalized position to CSS coordinates
    const x = (position.x _ 0.5 + 0.5) _ canvas.clientWidth, y = (position.y _ -0.5 + 0.5) _ canvas.clientHeight;
    return { x, y };
}
```

> https://blog.csdn.net/qq_30100043/article/details/80798791

9. obj/mlt 模型加载器

```javascript
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
export const objMTLLoader = (name: string, path = '') => {
    // instantiate a loader
    const mtlLoader = new MTLLoader()
    mtlLoader.setPath(path)
    mtlLoader.setCrossOrigin('')

    return new Promise((resolve, reject) => {
        // load a resource
        mtlLoader.load(`${name}.mtl`, (materials) => {
            materials.preload()
            const loader = new OBJLoader()
            loader.setMaterials(materials)
            loader.setPath(path)
            loader.setCrossOrigin('')
            loader.load(
                `${name}.obj`,
                (object) => {
                    resolve(object)
                },

                function (xhr) {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                function (error) {
                    console.log('An error happened')
                    reject(error)
                }
            )
        })
    })
}
```

10. sprite 量多的处理

sprite 和 mesh 不是一样的，所以不能用 instancedMesh 的方案

point + instanceBufferGeometry 的方案: https://stackoverflow.com/questions/51272621/three-js-points-with-multiple-textures

https://gamedev.stackexchange.com/questions/30043/how-many-textures-can-usually-i-bind-at-once shader 绑定的 texture 最大数量有限

根据 camera 的距离远近：比如固定只展示距离 camera 近的 100 个 sprite，距离远的使用 point 来表示， 大量的删除创建，性能也很差，做 diff 处理效果也不好

最后，直接用 sprite，性能更好

11. three.js 中 camera 看向某个模型

https://codepen.io/gwmatthias/pen/dypoxNL
https://discourse.threejs.org/t/calculate-point-between-camera-position-and-target-position/21156/5

12. three.js 中 lookAt、up 的理解

camera.up : 指定坐标系向上的轴，默认(0, 1,0) 默认 y 轴正方向向上，up 属性的改变将直接影响相机所处 3 维空间的位置。

```javascript
camera.up.set(0, 0, 1) // 设置z轴正方向向上
camera.up.set(1, 0, 0) // 设置x轴正方向向上
```

camera.lookAt: 目的是让 camera 的镜头看向三维空间中指定的位置。其调用形式如：lookAt（target）——其中 target 参数是一个具体 Vector3 对象，代表了三维空间的某点。

13. three.js 渲染优化

FPS 渲染速率优化：https://blog.csdn.net/weixin_37683659/article/details/100622408?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1.no_search_link&spm=1001.2101.3001.4242.2

THREEJS 性能优化： https://zhuanlan.zhihu.com/p/129295112

https://discoverthreejs.com/tips-and-tricks/

14. webgl 学习平台

webgl 学习平台：https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-3d-lighting-directional.html

图解 WebGL 与 Threejs 工作原理： https://www.jianshu.com/p/67809ccba021?tdsourcetag=s_pcqq_aiomsg

15. 解决 canvas 在高清屏中绘制模糊的问题: https://www.html.cn/archives/9297

16. 模型重叠闪烁的问题: https://www.cnblogs.com/lst619247/p/9098845.html

17. 相机透视解读：https://segmentfault.com/a/1190000008796468
