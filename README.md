# upset gal

Use Nextjs.

This project is run in the website [shinnku.com](https://www.shinnku.com/).

## for collaborator

### How to Build

`git clone https://github.com/shinnku-nikaidou/upset-gal-web.git`

`pnpm install`

`pnpm dev`

后端使用了 Microsoft 的 azure / graph api， 具体参考这几个网页

- <https://developer.microsoft.com/en-us/graph/graph-explorer>
- <https://docs.microsoft.com/en-US/graph/api/overview?view=graph-rest-1.0> 这个
  是 azure 团队写的文档.

关于 `config.yaml` 如何填写：

你需要注册个应用程式：

- [Microsoft Azure App registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
  (OneDrive international, OneDrive for Business or Education)
- [Microsoft Azure.cn App registrations](https://portal.azure.cn/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
  (OneDrive 世纪互联版本)

然后找到里面的 `clientId` and `clientSecret` 。

注册完一个应用之后，`Application (client) ID`就是这玩意了，一个 uuid-4。

then

1. Open _Certificates & secrets panel_.
2. Click _New client secret_.
3. Create a new secret with description `client_secret`.

是的，旁边还有一个 `Secret ID`，这东东没用，我们不需要它。

这样配置就完成了。

`ONEDRIVE_REFRESHTOKEN` 的生成：

`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id={%改写成你自己的%}&scope=offline_access%20User.Read%20Files.ReadWrite.All&response_type=code&redirect_uri={%改写成你自己的跳转网址%}`

我的的一些网址均为 `https://www.shinnku.com/api/onedrive-login` 也就是:

`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id={%改写成你自己的%}&scope=offline_access%20User.Read%20Files.ReadWrite.All&response_type=code&redirect_uri=https://www.shinnku.com/api/onedrive-login`

之后会跳转到一个网址，复制网址的 url，大概这样

`https://www.shinnku.com/api/onedrive-login?code={%需要被复制的内容%}&session_state={%不需要的uuid%}#`

### 有关缓存

第一次运行会生成缓存，请耐心等待。
