# ikantv 落地页部署指南（无需安装 Node.js）

推荐用 Cloudflare Pages 免费托管，并通过 GitHub 自动部署。你只需要浏览器和一个 GitHub 账号；首次配置 D1 和管理员密钥需在 Cloudflare 控制台完成。项目代码本身已包含前台、后台（/admin）及 API。本站不依赖 R2，图片和视频通过公开 URL 引用。

## 一、把项目放到 GitHub

1. 登录 GitHub，创建一个空仓库（例如 ikantv-site）。
2. 将本项目文件上传到仓库根目录。确保仓库根目录直接能看到 `wrangler.toml`、`public`、`functions`、`migrations`。
3. 建议仓库设为 Private，避免公开管理后台代码及站点配置。

## 二、创建 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
2. 连接 GitHub 并选择刚才的仓库。
3. 构建设置：Framework preset 选 **None**；Build command 留空；Build output directory 填 **public**。保存并部署。
4. 部署完成后会获得免费的 `*.pages.dev` 域名。

## 三、创建数据库并导入初始内容

Cloudflare → **Storage & databases** → **D1 SQL Database** → Create database，名称填 `ikantv-content`。进入数据库的 Console，打开项目中的 `migrations/0001_init.sql`，复制全部 SQL 执行一次。

然后进入 Pages 项目 → **Settings → Bindings → Add → D1 database**，变量名填 **DB**，选择 `ikantv-content`，保存并重新部署。

## 四、设置后台登录密钥

Pages 项目 → **Settings → Variables and Secrets**，在 Production 添加以下 Secrets，然后重新部署：

- `ADMIN_USER`：你自定的后台账号
- `ADMIN_PASSWORD`：你自定的强密码
- `SESSION_SECRET`：一串随机长字符串（至少 32 位）

打开 `https://你的项目.pages.dev/admin` 登录后台。

## 五、图片和视频素材

不需要创建或绑定 R2。后台内容编辑中，封面图片和视频地址填写公开可访问的 HTTPS URL。可以使用你已有的图床或视频托管服务；请确保链接允许你的网站访问。

## 日常更新

在 GitHub 网页编辑文件并提交后，Cloudflare 会自动重新部署。内容、首页下载地址等由后台保存到 D1，不需要改代码。

## 免费额度说明

Pages 提供免费静态托管；D1 和 Pages Functions 也有各自免费额度及使用限制。外部素材服务可能另有费用或流量限制。免费额度与资格可能变化，请以 [Cloudflare Pages 限制](https://developers.cloudflare.com/pages/platform/limits/)和 Cloudflare 控制台显示为准。项目目前不是“一键自动创建所有云资源”：数据库、绑定、密钥需首次在网页控制台手动设置。
