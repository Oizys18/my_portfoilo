import React, { useEffect } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

function TerminalComponent() {
  useEffect(() => {
    // set Terminal options
    var term = new Terminal({
      fontFamily: 'Consolas',
      fontWeight: 'bold',
      cursorBlink: true,
      fontSize: 15
    })
    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)

    term.welcome = () => {
      term.writeln('안녕하세요, \x1B[1;3;31mVisitor!\x1B[0m')
      //   term.writeln('Try\x1b[1;94m help\x1b[0m for commands')
      term.writeln('\x1b[1;94mhelp\x1b[0m로 명령어를 확인해보세요')
    }

    term.next = () => {
      term.write('\r\n' + '@oizys18\x1b[1;93m $ \x1b[0m')
    }

    term.help = () => {
      term.writeln('')
      term.writeln('~~~ 명령어 일람 ~~~')
      term.writeln('ls: 현 위치 탐색')
      term.writeln('cd *: 디렉토리 이동')
    }
    term.ls = () => {
      term.writeln('')
      term.writeln('projects')
      term.writeln('wave')
    }

    // init Terminal
    const terminalEl = document.getElementById('terminal')
    if (!terminalEl.classList.contains('loaded')) {
      term.open(document.getElementById('terminal'))
      document.getElementById('terminal').classList.add('loaded')
      fitAddon.fit()
      term.welcome()
      term.next()
    }
    term.onResize(fitAddon.fit())
    let cmd = ''
    term.onData(data => {
      const keyCode = data.charCodeAt(0)
      console.log(cmd)
      if (keyCode === 13) {
        console.log('enter')
        if (cmd === 'clear') {
          term.writeln('')
          term.clear()
          term.welcome()
        } else if (cmd === 'help') {
          term.help()
        } else if (cmd === 'ls') {
          term.ls()
        }
        term.next()
        cmd = ''
      } else if (keyCode === 3) {
        console.log('ctrl+c')
      } else if (keyCode === 26) {
        console.log('ctrl+z')
      } else if (keyCode === 27) {
        console.log('esc')
      } else if (keyCode === 127 && cmd.length > 1) {
        if (cmd.length > 1) {
          cmd = cmd.slice(0, cmd.length - 1)
          term.write('\b \b')
        }
      } else if (keyCode === 37 || keyCode === 39 || keyCode === 16) {
        return
      } else {
        cmd += data
        term.write(data)
      }
    })
  }, [])

  return <div id="terminal" />
}

export default TerminalComponent
