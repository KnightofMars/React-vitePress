
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
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'vitePress', link: '/vitepress' }
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
    }
  }
})


