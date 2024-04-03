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
