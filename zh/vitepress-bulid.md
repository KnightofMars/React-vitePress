## 官方配置

- vitePress基本配置就是看官网 [VitePress 是什么？ | VitePress](https://vitepress.dev/zh/guide/what-is-vitepress)

## b站博主配置俩栏以及构建

- 如何变俩栏布局和部署到github官网 查看 [vitepress搭建并部署网站 | AlbertZhang的文档网站](https://docs.bugdesigner.cn/docs/Tutorial/vitepress.html#%E9%83%A8%E7%BD%B2%E6%AD%A5%E9%AA%A4)
  
  - 俩栏布局没试(自己感觉不是很需要),大体实现流程应该是 
    
    - 在config.mjs中的themeConfig配置对象中配置
      
      ```jsx
      sidebar: false, // 关闭侧边栏
      aside: "left", // 设置右侧侧边栏在左侧显示
      ```
    
    -   自己去找对应的dom元素修改css，写在vitepress theme style.css 下面的配置
      
      ```jsx
      /* 自定义侧边栏在最左边，右边撑满宽度 */
      .VPDoc .container {
        margin: 0 !important;
      }
      @media (min-width: 960px) {
        .VPDoc:not(.has-sidebar) .content {
          max-width: 1552px !important;
        }
      }
      .VPDoc.has-aside .content-container {
        max-width: 1488px !important;
      }
      @media (min-width: 960px) {
        .VPDoc:not(.has-sidebar) .container {
          display: flex;
          justify-content: center;
          max-width: 1562px !important;
        }
      }
      .aside-container {
        position: fixed;
        top: 0;
        padding-top: calc(
          var(--vp-nav-height) + var(--vp-layout-top-height, 0px) +
            var(--vp-doc-top-height, 0px) + 10px
        ) !important;
        width: 224px;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        scrollbar-width: none;
      }
      
      /* 自定义h2的间距 */
      .vp-doc h2 {
        margin: 0px 0 16px;
        padding-top: 24px;
        border: none;
      }
      ```
  
  - 但这个是个人建站 可能不稳定，大致梳理一下部署到github上的步骤
    
    - 1.github上建立仓库
      
      - ![](https://my-picture-bed1-1321100201.cos.ap-beijing.myqcloud.com/mypictures/image-20240108205813594.png)
    
    - 2.在config.mts文件里面(js就是config.mjs) 添加base  base就是仓库名
      
      ![](https://marsknight.oss-cn-hangzhou.aliyuncs.com/img/Code_YO8mLlVMWm.png)
      
      ```jsx
      export default defineConfig({
        base:'/react-vitePress/',
         themeConfig: {...}
      }
      ```
    
    - 3. 初始化git仓库 添加gitignore文件 提交代码 推送到新建的
    
    - 4.选择刚刚创建好仓库，setting->page->source(GitHub Action) 这一步的大概意思就是在设置里选择你要构建的工作流是什么![image-20240108210624305](https://my-picture-bed1-1321100201.cos.ap-beijing.myqcloud.com/mypictures/image-20240108210624305.png)
    
    - 5.设置工作流 action->set up a workflow youself
      
      ![image-20240108210710694](https://my-picture-bed1-1321100201.cos.ap-beijing.myqcloud.com/mypictures/image-20240108210710694.png)
    
    - 6.重命名并设置deploy脚本  这个博客博主用的pnpm 我是npm 配置差不多 为啥要设置这个脚本呢   你每次代码推到master时 就会自动给你构建
      
      ```md
      # 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
      # 工作流名称
      name: Deploy VitePress site to Pages 
      
      on:
        # 在针对 `main` 分支的推送上运行。如果你
        # 使用 `master` 分支作为默认分支，请将其更改为 `master`
        push:
          branches: [master]
      
        # 允许你从 Actions 选项卡手动运行此工作流程
        workflow_dispatch:
      
      # 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
      permissions:
        contents: read
        pages: write
        id-token: write
      
      # 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
      # 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
      concurrency:
        group: pages
        cancel-in-progress: false
      
      jobs:
        # 构建工作
        build:
          runs-on: ubuntu-latest
          steps:
            - name: Checkout
              uses: actions/checkout@v4
              with:
                fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
            # - uses: pnpm/action-setup@v2 # 如果使用 pnpm，请取消注释
            # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
            - name: Setup Node
              uses: actions/setup-node@v4
              with:
                node-version: 20
                cache: npm # 或 pnpm / yarn
            - name: Setup Pages
              uses: actions/configure-pages@v4
            - name: Install dependencies
              run: npm ci # 或 pnpm install / yarn install / bun install
            - name: Build with VitePress
              run: |
                npm run docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
                touch .vitepress/dist/.nojekyll #这个地方需要配置 如果是在项目目录下则加 /目录名/.vitepress/dist/.nojekyll
                #如果不是项目里 即vitepress单独是一个项目就是 .vitepress/dist/.nojekyll
                #总结 要根据目录路径配置 这里踩大坑 一直以为是node版本和GitHubpage设置错了
            - name: Upload artifact
              uses: actions/upload-pages-artifact@v3
              with:
                path: .vitepress/dist # 同上 run: touch那里一样 路径
        # 部署工作
        deploy:
          environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}
          needs: build
          runs-on: ubuntu-latest
          name: Deploy
          steps:
            - name: Deploy to GitHub Pages
              id: deployment
              uses: actions/deploy-pages@v4
      ```
    
    - 粘贴脚本->更改名字为deploy.yml->commit changes 或者直接ctrl+s 保存提交
      
      ![image-20240108210850443](https://my-picture-bed1-1321100201.cos.ap-beijing.myqcloud.com/mypictures/image-20240108210850443.png)
    
    - setting -> page ->GitHub pages 直接点击 visit site即可
      
      ![image-20240108211049140](https://my-picture-bed1-1321100201.cos.ap-beijing.myqcloud.com/mypictures/image-20240108211049140.png) 
      
      > **<a style="color:red">踩坑点:部署上去发现css没有生效 直接添加一个.nojekyll文件 里面什么都不需要写 这个文件就是告诉 Github Pages 当前网站不是基于 Jekyll 构建的，不要忽略掉下划线开头的文件和文件夹。</a>**

##  最后更新时间等额外配置,并且中文显示

[VitePress 手把手完全使用手册 - 掘金](https://juejin.cn/post/7164276166084263972)[VitePress 手把手完全使用手册 - 掘金](https://juejin.cn/post/7164276166084263972)

```jsx
 export default defineConfig({
 themeConfig:{
   docFooter: { prev: '上一篇', next: '下一篇' },
   lastUpdatedText: "最近更新时间"
   }
 })
```

## 中英文切换

读文档能力太差，读官方文档只是配置了如何显示这个下拉框 实现不了任何功能 网上也没有搜到方法 最后是直接看vitepress这个文档的源码 发现

![](https://marsknight.oss-cn-hangzhou.aliyuncs.com/img/chrome_XX7XjL3Qec.png)

```jsx
export default defineConfig({
import { en } from './en'
  // 共享属性和其他顶层内容...
  locales: {
    root: {
      label: '中文',//下拉框里面的label名称
      lang: 'zh-CN',//将作为 `lang` 属性添加到 `html` 标签中
      description:'让我看看这个描述是什么'//这个没发现是什么用
    },
    en: {
      label: 'English',
      ...en
    }
  },
})
```

en这个文件是和config.m.ts内容差不多 只不过全部改为英文引入 或者学vitepress官方配置 建俩个(config.m.ts)文件 最后合并一起 一个是中文的 一个是英文的

![](https://marsknight.oss-cn-hangzhou.aliyuncs.com/img/chrome_X891S1Phyk.png)

下面是我自己搞得英文文档 注意事项就是link后面的路径问题 现在都是写死的 肯定不能这样搞 效果实现了 但是太麻烦了  将来要用node去读取 更改为自动的函数 事实上是官方也是这么做的

```jsx
import { defineConfig } from 'vitepress'
export const en = defineConfig({
  lang: 'en-US',
  description: 'Vite & Vue powered static site generator.',
  themeConfig: {
    nav: [
      { text: 'dropDownMenu', link: '/en/' },
      { text: 'advance', link: '/en/markdown-examples' },
      { text: 'example', 
        items: [
        {
          // 该部分的标题
          text: 'basicKnowledge',
          items: [
            { text: 'trafficLight', link: '/djj' },
            { text: 'repairData', link: '/dd' }
          ]
        }
      ] }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/en/api-examples' },
          { text: 'vitePress', link: '/en/vitepress' }
        ]
      }
    ],
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: "Getting a good night's sleep is more important than love",
      copyright: 'Copyright © 2024-present MarsKnight'
    },
    docFooter: { prev: 'Previous page', next: 'Next page' },
    lastUpdatedText: "Last updated"
  }
})
```

目录 如下 设置英文后 要有路径指向英文内容的md,实际就是一个页面 俩份md文档 一个是中文的 一个是英文的 然后再locales中配置 配置的时候注意路径就好了

```md
|-- .
    |-- .gitignore
    |-- .nojekyll
    |-- api-examples.md
    |-- index.md
    |-- markdown-examples.md
    |-- package-lock.json
    |-- package.json
    |-- vitepress.md
    |-- .github
    |   |-- workflows
    |       |-- deploy.yml
    |-- .vitepress
    |   |-- config.mts
    |   |-- en.ts
    |-- en
    |   |-- api-examples.md
    |   |-- index.md
    |   |-- markdown-examples.md
    |-- public
        |-- background.png
        |-- favicon.ico
        |-- fruit.svg
        |-- React.svg fruit.svg',
        |-- React.svg',
```

##  outline属性

控制页面右边侧边栏的名称 以前根据md标题 # 多少 来自动生成右侧的锚点 默认是deep

```jsx
  themeConfig: {
     outline: {
      label: '页面导航'
    },
  }
```

![](https://marsknight.oss-cn-hangzhou.aliyuncs.com/img/chrome_zVbPv7CllF.png)
