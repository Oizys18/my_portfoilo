import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { useToast } from '@chakra-ui/toast'
import { useColorModeValue } from '@chakra-ui/color-mode'

const TerminalComponent = ({ closeTerminal }) => {
  // const toast = useToast()
  // if (!toast.isActive('tToast')) {
  //   toast({ id: 'tToast', title: 'terminal opened!', duration: 1000 })
  // }

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
  const { locale } = router

  useEffect(() => {
    const term = new Terminal({
      fontFamily: '"Cascadia Code", Menlo, monospace',
      theme: thisTheme,
      cursorBlink: true,
      rows: 20,
      cursorStyle: 'underline'
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

    // const isWebglEnabled = false
    // try {
    //   const webgl = new window.WebglAddon.WebglAddon()
    //   term.loadAddon(webgl)
    //   isWebglEnabled = true
    // } catch (e) {
    //   console.warn('WebGL addon threw an exception during load', e)
    // }

    // Cancel wheel events from scrolling the page if the terminal has scroll back
    document.querySelector('.xterm').addEventListener('wheel', e => {
      if (term.buffer.active.baseY > 0) {
        e.preventDefault()
      }
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
            '\x1b[36;1m@Oizys18\x1b[0m [' +
            time.getHours() +
            ':' +
            time.getMinutes() +
            ']'
        )
        term.write('\r\n$ ')
      }

      // Welcome message
      term.welcome = () => {
        const welcome = {
          ko: [
            '  \x1b[31;1mHello World!',
            '  \x1b[34;1m양찬우 - Portfolio Website\x1b[0m ',
            ' ┌ \x1b[1mFeatures\x1b[0m ────────────────┐',
            // ' │                          │',
            ' │  \x1b[31;1m팀 프로젝트\x1b[0m             │',
            ' │  - Github 공개 팀프로젝트│',
            ' │                          │',
            ' │  \x1b[32;1m토이 프로젝트\x1b[0m           │',
            ' │  - 개인 공부 및 연습용   │',
            ' │                          │',
            ' │  \x1b[33;1mUI 컴포넌트\x1b[0m             │',
            ' │  - 작은 UI 컴포넌트들    │',
            ' └──────────────────────────┘'
          ],
          en: [
            '  \x1b[31;1mHello World!',
            '  \x1b[34;1mYangChanWoo - Portfolio Website\x1b[0m ',
            ' ┌ \x1b[1mFeatures\x1b[0m ────────────────┐',
            ' │  \x1b[31;1mTeam Project\x1b[0m            │',
            ' │  - Github Public projects│',
            ' │                          │',
            ' │  \x1b[32;1mToy Projects\x1b[0m            │',
            ' │  - Study & Practice      │',
            ' │                          │',
            ' │  \x1b[33;1mUI Components\x1b[0m           │',
            ' │  - Small UI components   │',
            ' └──────────────────────────┘'
          ]
        }
        term.writeln([...welcome[locale]].join('\n\r'))
      }
      term.welcome()
      const welcomeMessage = {
        ko: '  Welcome! \r\n  명령어 \x1b[31;1mhelp\x1b[0m를 사용해보세요',
        en: '  Welcome! \r\n  Try out \x1b[31;1mhelp\x1b[0m'
      }
      term.writeln(welcomeMessage[locale])
      term.prompt()
      term.onData(e => {
        switch (e) {
          case '\x1B':
            onClose()
            break
          case '\u0003': // Ctrl+C
            term.clear()
            term.write('^C')
            term.prompt()
            break
          case '\r': // Enter
            term.clear()
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
      wave: {
        title: 'JS canvas Wave',
        link: 'https://github.com/Oizys18/toy_projects/tree/master/wave',
        description: {
          ko: [
            'Interactive designer님의 영상을 공부한 후 canvas 연습을 위해 생성한 프로젝트',
            'Class로 Wave를 만들고, WaveGroup으로 묶어서 HTML canvas에 그린다.',
            'wave 갯수와 point의 갯수로 파형을 조정할 수 있다.'
          ],
          en: [
            'Project to study HTML5 canvas, studied with the video of @Interactive Designer',
            'Makes Wave instance with JS class, group by wave group and draw on HTML canvas',
            'The waves can be controlled with wave count and points'
          ]
        },
        created_at: '2021.03'
      },
      gallery: {
        title: 'UI components',
        link: 'https://github.com/Oizys18/toy_projects/tree/master/wave',
        description: {
          ko: [
            '여러 프로젝트 참여 중 생성했던 여러 UI 컴포넌트들',
            '라이브러리를 사용해도 되지만, 더 세밀한 조작과 스타일 지정을 위해',
            '직접 생성한 컴포넌트들이다.'
          ],
          en: [
            'Various UI components made during several projects',
            'Coded from zero for better control over style & operation'
          ]
        },
        created_at: '2021'
      },
      burger: {
        title: 'Bouncy Burger',
        link: 'https://github.com/Oizys18/GREAT',
        description: {
          ko: [
            'GrEat 팀프로젝트 중 랜딩페이지를 위해 제작한 Interactive Image',
            '현재 마우스 포인터의 x,y 좌표를 읽어서 햄버거 이미지를 움직인다.'
          ],
          en: [
            'Interactive Image made while participating in GrEAT Team Project.',
            'Made for Landing Page style',
            'Moves Hamburger Image according to the x,y coordinate of mouse pointer'
          ]
        },
        created_at: '2020.05.05'
      }
    }

    // 명령어 모음
    var command = ''
    const commands = {
      home: {
        f: () => {
          router.push('/', '/', { shallow: true })
          term.prompt()
        },
        description: `${locale === 'ko' ? '메인화면으로' : 'To IndexPage'}`
      },
      close: {
        f: () => {
          onClose()
        },
        description: `${locale === 'ko' ? '터미널 닫기' : 'Close Terminal'}`
      },
      help: {
        f: () => {
          term.writeln(
            [
              `${
                locale === 'ko'
                  ? '포트폴리오 방문을 환영합니다'
                  : 'Welcome to this.self Portfolio'
              }`,
              `${
                locale === 'ko'
                  ? '아래 명령어를 사용해보세요'
                  : 'Try out commands below'
              }`,
              '',
              ...Object.keys(commands)
                .filter(e => e != 'show')
                .map(
                  e =>
                    ` \x1b[34;1m${e.padEnd(11)}\x1b[0m  ${
                      commands[e].description
                    }`
                ),
              ` \x1b[34;1m${'show [name]'.padEnd(11)}\x1b[0m  ${
                commands['show'].description
              }`
            ].join('\n\r')
          )
          term.prompt()
        },
        description: `${
          locale === 'ko' ? 'help 메세지 출력' : 'Print out help message'
        }`
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
        description: `${
          locale === 'ko' ? '프로젝트 리스트 확인' : 'Check Project list'
        }`
      },
      show: {
        f: project => {
          if (!project) {
            term.writeln('Please input project name')
            term.prompt()
          } else if (project == 'sth') {
            term.writeln('sth is not a project.....')
            term.writeln('Try proper project name!')
            term.prompt()
          } else if (project in projects) {
            router.push(`/projects/${project}`, `/projects/${project}`, {
              shallow: true
            })
            term.writeln(
              [
                `  \x1b[32;1m${projects[project]['title']}\x1b[0m - ${projects[project]['created_at']}`,
                `  Link: ${projects[project]['link']}`,
                '',
                ...projects[project]['description'][`${locale}`].map(
                  e => `  ${e}`
                )
              ].join('\r\n')
            )
            term.prompt()
          } else {
            term.writeln(`${project}: project not found`)
            term.prompt()
          }
        },
        description: `${locale === 'ko' ? '프로젝트 확인' : 'Check Project'}`
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
