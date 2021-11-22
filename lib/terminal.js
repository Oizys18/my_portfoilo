import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { useColorModeValue } from '@chakra-ui/color-mode'
const TerminalComponent = ({ closeTerminal }) => {
  const onClose = closeTerminal
  const baseTheme = {
    foreground: '#2D2E2C',
    background: '#F8F8F8',
    selection: '#5DA5D533',
    black: '#1E1E1D',
    brightBlack: '#262625',
    red: '#CE5C5C',
    brightRed: '#FF7272',
    green: '#5BCC5B',
    brightGreen: '#72FF72',
    yellow: '#CCCC5B',
    brightYellow: '#FFFF72',
    blue: '#5D5DD3',
    brightBlue: '#7279FF',
    magenta: '#BC5ED1',
    brightMagenta: '#E572FF',
    cyan: '#5DA5D5',
    brightCyan: '#72F0FF',
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
  const isBaseTheme = true

  const thisTheme = useColorModeValue(baseTheme, otherTheme)
  const router = useRouter()

  useEffect(() => {
    const term = new Terminal({
      fontFamily: '"Cascadia Code", Menlo, monospace',
      theme: thisTheme,
      cursorBlink: true
    })
    const fitAddon = new FitAddon()
    term.loadAddon(new WebLinksAddon())
    term.loadAddon(fitAddon)

    const terminalEl = document.getElementById('terminal')
    if (!terminalEl.classList.contains('loaded')) {
      term.open(document.getElementById('terminal'))
      document.getElementById('terminal').classList.add('loaded')
      fitAddon.fit()
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

    function runFakeTerminal() {
      if (term._initialized) {
        return
      }

      term._initialized = true

      term.prompt = () => {
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

      // TODO: Use a nicer default font
      term.writeln(
        [
          '    \x1b[31;1mHello World!',
          '    \x1b[34;1m양찬우 - Yang ChanWoo\x1b[0m 포트폴리오에 방문해주셔서 감사합니다.',
          // '                           \x1b[3mVS Code\x1b[0m, \x1b[3mHyper\x1b[0m and \x1b[3mTheia\x1b[0m!',
          '',
          ' ┌ \x1b[1mFeatures\x1b[0m ──────────────────────────────────────────────────────────────────┐',
          ' │                                                                            │',
          ' │  \x1b[31;1mApps just work                         \x1b[32mPerformance\x1b[0m                        │',
          ' │   Xterm.js works with most terminal      Xterm.js is fast and includes an  │',
          ' │   apps like bash, vim and tmux           optional \x1b[3mWebGL renderer\x1b[0m           │',
          ' │                                                                            │',
          ' │  \x1b[33;1mAccessible                             \x1b[34mSelf-contained\x1b[0m                     │',
          ' │   A screen reader mode is available      Zero external dependencies        │',
          ' │                                                                            │',
          ' │  \x1b[35;1mUnicode support                        \x1b[36mAnd much more...\x1b[0m                   │',
          ' │   Supports CJK 語 and emoji \u2764\ufe0f            \x1b[3mLinks\x1b[0m, \x1b[3mthemes\x1b[0m, \x1b[3maddons\x1b[0m, \x1b[3mtyped API\x1b[0m  │',
          ' │                                            ^ Try clicking italic text      │',
          ' │                                                                            │',
          ' └────────────────────────────────────────────────────────────────────────────┘',
          ''
        ].join('\n\r')
      )

      term.writeln(
        '양찬우 포트폴리오에 오신 걸 환영합니다!\r\nTry running `help`.'
      )
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
              term.write(' 1 ')
            }
        }
      })

      // Create a very simple link provider which hardcodes links for certain lines
      term.registerLinkProvider({
        provideLinks(bufferLineNumber, callback) {
          switch (bufferLineNumber) {
            case 2:
              callback([
                {
                  text: 'VS Code',
                  range: { start: { x: 28, y: 2 }, end: { x: 34, y: 2 } },
                  activate() {
                    window.open('https://github.com/microsoft/vscode', '_blank')
                  }
                },
                {
                  text: 'Hyper',
                  range: { start: { x: 37, y: 2 }, end: { x: 41, y: 2 } },
                  activate() {
                    window.open('https://github.com/vercel/hyper', '_blank')
                  }
                },
                {
                  text: 'Theia',
                  range: { start: { x: 47, y: 2 }, end: { x: 51, y: 2 } },
                  activate() {
                    window.open(
                      'https://github.com/eclipse-theia/theia',
                      '_blank'
                    )
                  }
                }
              ])
              return
            case 8:
              callback([
                {
                  text: 'WebGL renderer',
                  range: { start: { x: 54, y: 8 }, end: { x: 67, y: 8 } },
                  activate() {
                    window.open(
                      'https://npmjs.com/package/xterm-addon-webgl',
                      '_blank'
                    )
                  }
                }
              ])
              return
            case 14:
              callback([
                {
                  text: 'Links',
                  range: { start: { x: 45, y: 14 }, end: { x: 49, y: 14 } },
                  activate() {
                    window.alert('You can handle links any way you want')
                  }
                },
                {
                  text: 'themes',
                  range: { start: { x: 52, y: 14 }, end: { x: 57, y: 14 } },
                  activate() {
                    isBaseTheme = !isBaseTheme
                    term.setOption(
                      'theme',
                      isBaseTheme ? baseTheme : otherTheme
                    )
                    document
                      .querySelector('.demo .inner')
                      .classList.toggle('other-theme', !isBaseTheme)
                    term.write(
                      `\r\nActivated ${
                        isBaseTheme ? 'xterm.js' : 'snazzy'
                      } theme`
                    )
                    prompt(term)
                  }
                },
                {
                  text: 'addons',
                  range: { start: { x: 60, y: 14 }, end: { x: 65, y: 14 } },
                  activate() {
                    window.open('/docs/guides/using-addons/', '_blank')
                  }
                },
                {
                  text: 'typed API',
                  range: { start: { x: 68, y: 14 }, end: { x: 76, y: 14 } },
                  activate() {
                    window.open(
                      'https://github.com/xtermjs/xterm.js/blob/master/typings/xterm.d.ts',
                      '_blank'
                    )
                  }
                }
              ])
              return
          }
          callback(undefined)
        }
      })
    }

    function prompt(term) {
      command = ''
      term.write('\r\n$ ')
    }
    const projects = {
      a: 'AAA 프로젝트',
      b: 'BBB 프로젝트',
      c: 'CCC 프로젝트'
    }
    const command = ''
    const commands = {
      show: {
        f: project => {
          if (!project) {
            term.writeln('Please input project name')
            term.prompt()
            return
          } else if (project in projects) {
            router.push(`/projects/${project}`)
            // 명령 실행 후 터미널 닫기
            onClose()
            return
          }
          term.writeln(`${project}: project not found`)
        },
        description: 'show particular project'
      },
      projects: {
        f: () => {
          term.writeln(
            [
              ...Object.keys(projects).map(
                e => ` ${e.padEnd(10)} ${projects[e]}`
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
              ...Object.keys(commands).map(
                e => `  ${e.padEnd(10)} ${commands[e].description}`
              )
            ].join('\n\r')
          )
          term.prompt()
        },
        description: 'Prints this help message'
      },
      ls: {
        f: () => {
          term.writeln(['a', 'bunch', 'of', 'fake', 'files'].join('\r\n'))
          term.prompt()
        },
        description: 'Prints a fake directory structure'
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
