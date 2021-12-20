const upload = ({ setVideo, inputRef }) => {
  const onChangeHandler = file => {
    // https://caniuse.com/?search=video%20format
    // mp4, mov로만 제한
    if (!(file.type == 'video/mp4' || file.type == 'video/quicktime')) {
      alert('mov, mp4 확장자만 업로드 가능합니다.')
    } else {
      setVideo(file)
    }
  }
  return (
    <div className="upload">
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        name="file"
        accept=".mp4,.quicktime"
        required
        onChange={({
          target: {
            validity,
            files: [file]
          }
        }) => {
          validity.valid && onChangeHandler(file)
        }}
      />
    </div>
  )
}
export default upload
