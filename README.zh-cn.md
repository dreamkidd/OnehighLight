# OneNote 代码高亮 Add-ins

目前此插件仅支持 Web 版本,并且**建议使用自行构建部署**的方式

我目前没有找到更好的部署方式,现在只能采用本地上传的方式发布,如果其他部署方式欢迎 PR

## 方法 1 直接上传 `manifest.xml`

没有条件自行部署的的可以使用我提供的 `manifest.xml` 

点击 **插入** - **Office 外接程序**

按如下操作进行配置
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gh5q0zjelnj325607k0v4.jpg)
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gh5q514gvoj316e0kaq47.jpg)
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gh5q3jt1s0j30nq0esgmc.jpg)

上传完成以后,即可在
**开始** - **TaskPanel** 中找到插件
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gh5q6kmisdj325i07kgm3.jpg)

在代码段中插入要高亮的代码,并选择对应的语言,默认可选 Auto(可能效果没有对应的语言的效果好),并点击 run 即可在当前页插入高亮后的代码

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gh5ucvscv7j31cb0u0abs.jpg)

