import { useState, useEffect } from 'react'

const useSessionStorage = name => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!sessionStorage.getItem(name)) {
      setValue(sessionStorage.getItem(name))
    } else {
      sessionStorage.setItem(name, true)
    }
  }, [])

  return value
}

export default useSessionStorage

/* 
# 도전과제 State관리 -> SessionStorage 사용 
1. 포트폴리오 페이지 방문 -> 도전과제 시작 
2. 각 프로젝트 페이지 방문 -> 각 페이지 카운트 
3. Terminal 사용 
4. 다크/라이트 테마 변경 
5. Github 링크 열기 
6. 블로그 방문 
7. Wave 페이지 파도 조정 해보기 
8. 


*/
