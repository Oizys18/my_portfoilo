import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { useColorModeValue } from '@chakra-ui/color-mode'

const TerminalComponent = ({ closeTerminal }) => {
  const onClose = closeTerminal
  const baseTheme = {
    foreground: '#000000',
    background: '#f9f9f9',
    selection: '#a0a1a7',
    black: '#1E1E1D',
    brightBlack: '#262625',
    red: '#CE5C5C',
    brightRed: '#d52753',
    green: '#5BCC5B',
    brightGreen: '#23974a',
    yellow: '#CCCC5B',
    brightYellow: '#c5a332',
    blue: '#5D5DD3',
    brightBlue: '#0098dd',
    magenta: '#BC5ED1',
    brightMagenta: '#E572FF',
    cyan: '#5DA5D5',
    brightCyan: '#7a82da',
    white: '#F8F8F8',
    brightWhite: '#FFFFFF'
  }
  // vscode-snazzy https://github.com/Tyriar/vscode-snazzy
  const otherTheme = {
    foreground: '#eff0eb',
    background: '#282a36',
    selection: '#97979b33',
    black: '#282a36',
    brightBlack: '#686868',
    red: '#ff5c57',
    brightRed: '#ff5c57',
    green: '#5af78e',
    brightGreen: '#5af78e',
    yellow: '#f3f99d',
    brightYellow: '#f3f99d',
    blue: '#57c7ff',
    brightBlue: '#57c7ff',
    magenta: '#ff6ac1',
    brightMagenta: '#ff6ac1',
    cyan: '#9aedfe',
    brightCyan: '#9aedfe',
    white: '#f1f1f0',
    brightWhite: '#eff0eb'
  }
  // const isBaseTheme = true

  const thisTheme = useColorModeValue(baseTheme, otherTheme)
  const router = useRouter()

  useEffect(() => {
    const term = new Terminal({
      fontFamily: '"Cascadia Code", Menlo, monospace',
      theme: thisTheme,
      cursorBlink: true,
      rows: 20
    })
    const fitAddon = new FitAddon()
    const webLink = new WebLinksAddon()
    term.loadAddon(webLink)
    term.loadAddon(fitAddon)

    const terminalEl = document.getElementById('terminal')
    if (!terminalEl.classList.contains('loaded')) {
      term.open(terminalEl)
      terminalEl.classList.add('loaded')
      fitAddon.fit()
      document.querySelector('.xterm-helper-textarea').focus()
    }

    const isWebglEnabled = false
    try {
      const webgl = new window.WebglAddon.WebglAddon()
      term.loadAddon(webgl)
      isWebglEnabled = true
    } catch (e) {
      console.warn('WebGL addon threw an exception during load', e)
    }

    // Cancel wheel events from scrolling the page if the terminal has scrollback
    document.querySelector('.xterm').addEventListener('wheel', e => {
      if (term.buffer.active.baseY > 0) {
        e.preventDefault()
      }
    })

    // Cancel bubbling,
    document
      .querySelector('.xterm-helper-textarea')
      .addEventListener('keyup', e => {
        e.preventDefault()
        e.stopPropagation()
        e.cancelBubble = true
      })

    function runFakeTerminal() {
      if (term._initialized) {
        return
      }

      term._initialized = true

      term.prompt = () => {
        command = ''
        const time = new Date(Date.now())
        term.write(
          '\r\n' +
            '@oizys18 [' +
            time.getHours() +
            ':' +
            time.getMinutes() +
            ']'
        )
        term.write('\r\n$ ')
      }

      // Welcome message
      term.writeln(
        [
          '  \x1b[31;1mHello World!',
          '  \x1b[34;1m양찬우 - Portfolio Website\x1b[0m ',
          ' ┌ \x1b[1mFeatures\x1b[0m ────────────────┐',
          ' │                          │',
          ' │  \x1b[31;1m팀 프로젝트\x1b[0m             │',
          ' │  - Github 공개 팀프로젝트│',
          ' │                          │',
          ' │  \x1b[32;1m토이 프로젝트\x1b[0m           │',
          ' │  - 개인 공부 및 연습용   │',
          ' │                          │',
          ' │  \x1b[33;1mUI 컴포넌트\x1b[0m             │',
          ' │  - 작은 UI 컴포넌트들    │',
          ' │                          │',
          ' └──────────────────────────┘'
        ].join('\n\r')
      )
      term.writeln('  Welcome! \r\n  Try running \x1b[31;1mhelp\x1b[0m')
      term.prompt()
      term.onData(e => {
        switch (e) {
          case '\u0003': // Ctrl+C
            term.write('^C')
            term.prompt()
            break
          case '\r': // Enter
            runCommand(term, command)
            command = ''
            break
          case '\u007F': // Backspace (DEL)
            // Do not delete the prompt
            if (term._core.buffer.x > 2) {
              term.write('\b \b')
              if (command.length > 0) {
                command = command.substr(0, command.length - 1)
              }
            }
            break
          default:
            // Print all other characters for demo
            if (
              (e >= String.fromCharCode(0x20) &&
                e <= String.fromCharCode(0x7b)) ||
              e >= '\u00a0'
            ) {
              command += e
              term.write(e)
              return false
            }
        }
      })

      // Create a very simple link provider which hardcodes links for certain lines
      // term.registerLinkProvider({
      //   provideLinks(bufferLineNumber, callback) {
      //     switch (bufferLineNumber) {
      //       case 3:
      //         callback([
      //           {
      //             text: 'Hello',
      //             range: { start: { x: 2, y: 19 }, end: { x: 9, y: 19 } },
      //             activate() {
      //               window.open('https://github.com/microsoft/vscode', '_blank')
      //             }
      //           }
      //           // {
      //           //   text: 'Hyper',
      //           //   range: { start: { x: 37, y: 2 }, end: { x: 41, y: 2 } },
      //           //   activate() {
      //           //     window.open('https://github.com/vercel/hyper', '_blank')
      //           //   }
      //           // },
      //           // {
      //           //   text: 'Theia',
      //           //   range: { start: { x: 47, y: 2 }, end: { x: 51, y: 2 } },
      //           //   activate() {
      //           //     window.open(
      //           //       'https://github.com/eclipse-theia/theia',
      //           //       '_blank'
      //           //     )
      //           //   }
      //           // }
      //         ])
      //         return
      //       case 8:
      //         callback([
      //           {
      //             text: 'WebGL renderer',
      //             range: { start: { x: 54, y: 8 }, end: { x: 67, y: 8 } },
      //             activate() {
      //               window.open(
      //                 'https://npmjs.com/package/xterm-addon-webgl',
      //                 '_blank'
      //               )
      //             }
      //           }
      //         ])
      //         return
      //       case 14:
      //         callback([
      //           {
      //             text: 'Links',
      //             range: { start: { x: 45, y: 14 }, end: { x: 49, y: 14 } },
      //             activate() {
      //               window.alert('You can handle links any way you want')
      //             }
      //           },
      //           {
      //             text: 'themes',
      //             range: { start: { x: 52, y: 14 }, end: { x: 57, y: 14 } },
      //             activate() {
      //               isBaseTheme = !isBaseTheme
      //               term.setOption(
      //                 'theme',
      //                 isBaseTheme ? baseTheme : otherTheme
      //               )
      //               document
      //                 .querySelector('.demo .inner')
      //                 .classList.toggle('other-theme', !isBaseTheme)
      //               term.write(
      //                 `\r\nActivated ${
      //                   isBaseTheme ? 'xterm.js' : 'snazzy'
      //                 } theme`
      //               )
      //               prompt(term)
      //             }
      //           },
      //           {
      //             text: 'addons',
      //             range: { start: { x: 60, y: 14 }, end: { x: 65, y: 14 } },
      //             activate() {
      //               window.open('/docs/guides/using-addons/', '_blank')
      //             }
      //           },
      //           {
      //             text: 'typed API',
      //             range: { start: { x: 68, y: 14 }, end: { x: 76, y: 14 } },
      //             activate() {
      //               window.open(
      //                 'https://github.com/xtermjs/xterm.js/blob/master/typings/xterm.d.ts',
      //                 '_blank'
      //               )
      //             }
      //           }
      //         ])
      //         return
      //     }
      //     callback(undefined)
      //   }
      // })
    }

    // 프로젝트 모음
    const projects = {
      fiddle: {
        title: 'UI components',
        link: 'https://github.com/Oizys18/toy_projects/tree/master/wave',
        description: [
          '여러 프로젝트 참여 중 생성했던 여러 UI 컴포넌트들',
          '라이브러리를 사용해도 되지만, 더 세밀한 조작과 스타일 지정을 위해',
          '직접 생성한 컴포넌트들이다.'
        ],
        created_at: '2021.05.05'
      },
      burger: {
        title: 'Bouncy Burger',
        link: 'https://github.com/Oizys18/toy_projects/tree/master/wave',
        description: [
          'GrEat 팀프로젝트 중 랜딩페이지를 위해 제작한 Interactive Image',
          '현재 마우스 포인터의 x,y 좌표를 읽어서 햄버거 이미지를 움직인다.'
        ],
        created_at: '2021.05.05'
      },
      wave: {
        title: 'JS canvas Wave',
        link: 'https://github.com/Oizys18/toy_projects/tree/master/wave',
        description: [
          'Interactive designer님의 영상을 공부한 후 canvas 연습을 위해 생성한 프로젝트',
          'Class로 Wave를 만들고, WaveGroup으로 묶어서 HTML canvas에 그린다.',
          'wave 갯수와 point의 갯수로 파형을 조정할 수 있다.'
        ],
        created_at: '2021.05.05'
      }
    }

    // 명령어 모음
    var command = ''
    const commands = {
      close: {
        f: () => {
          onClose()
        },
        description: 'Close the terminal'
      },
      home: {
        f: () => {
          router.push('/')
          term.prompt()
        },
        description: 'Go to Index'
      },
      show: {
        f: project => {
          if (!project) {
            term.writeln('Please input project name')
            term.prompt()
            return
          } else if (project == 'sth') {
            term.writeln('sth is not a project.....')
            term.writeln('Try proper project name!')
            term.prompt()
            return
          } else if (project in projects) {
            router.push(`/projects/${project}`)
            term.writeln(
              [
                '',
                `  \x1b[32;1m${projects[project]['title']}\x1b[0m - ${projects[project]['created_at']}`,
                '',
                `  Link: ${projects[project]['link']}`,
                '',
                ...projects[project]['description'].map(e => `  ${e}`)
              ].join('\r\n')
            )
            term.prompt()
            return
          }
          term.writeln(`${project}: project not found`)
          term.prompt()
        },
        description: 'show particular project'
      },
      projects: {
        f: () => {
          term.writeln(
            [
              ...Object.keys(projects).map(
                e => ` ${e.padEnd(10)} ${projects[e]['title']}`
              )
            ].join('\r\n')
          )
          term.prompt()
        },
        description: 'Show project list'
      },
      help: {
        f: () => {
          term.writeln(
            [
              'Welcome to xterm.js! Try some of the commands below.',
              '',
              ` \x1b[34;1m${'show sth'.padEnd(11)}\x1b[0m  ${
                commands['show'].description
              }`,
              ...Object.keys(commands)
                .filter(e => e != 'show')
                .map(
                  e =>
                    ` \x1b[34;1m${e.padEnd(11)}\x1b[0m  ${
                      commands[e].description
                    }`
                )
            ].join('\n\r')
          )
          term.prompt()
        },
        description: 'Prints this help message'
      },
      loadtest: {
        f: () => {
          let testData = []
          let byteCount = 0
          for (let i = 0; i < 50; i++) {
            let count = 1 + Math.floor(Math.random() * 79)
            byteCount += count + 2
            let data = new Uint8Array(count + 2)
            data[0] = 0x0a // \n
            for (let i = 1; i < count + 1; i++) {
              data[i] = 0x61 + Math.floor(Math.random() * (0x7a - 0x61))
            }
            // End each line with \r so the cursor remains constant, this is what ls/tree do and improves
            // performance significantly due to the cursor DOM element not needing to change
            data[data.length - 1] = 0x0d // \r
            testData.push(data)
          }
          let start = performance.now()
          for (let i = 0; i < 1024; i++) {
            for (const d of testData) {
              term.write(d)
            }
          }
          // Wait for all data to be parsed before evaluating time
          term.write('', () => {
            let time = Math.round(performance.now() - start)
            let mbs = ((byteCount / 1024) * (1 / (time / 1000))).toFixed(2)
            term.write(
              `\n\r\nWrote ${byteCount}kB in ${time}ms (${mbs}MB/s) using the ${
                isWebglEnabled ? 'webgl' : 'canvas'
              } renderer`
            )
            term.prompt()
          })
        },
        description: 'Simulate a lot of data coming from a process'
      }
    }

    function runCommand(term, text) {
      const texts = text.trim().split(' ')
      const command = text.trim().split(' ')[0]
      if (command.length > 0) {
        term.writeln('')
        if (command in commands) {
          if (texts.length == 2) {
            commands[command].f(texts[1])
          } else {
            commands[command].f()
          }
          return
        }
        term.writeln(`${command}: command not found`)
      }
      term.prompt()
    }

    runFakeTerminal()
  }, [])

  return <div id="terminal" />
}

export default TerminalComponent
