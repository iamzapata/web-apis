import { useEffect, useRef, useState } from "react"
import { LoaderIcon } from "../../Icons/Loader"
import styles from "./Photo.module.scss"

const WIDTH = 320

const Photo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const videoOutputRef = useRef<HTMLVideoElement>(null)
  const canvasOutputRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [height, setHeight] = useState(0)
  const [photos, setPhotos] = useState<HTMLImageElement[]>([])

  function clearCameraOutput() {
    const canvas = canvasRef.current

    if (!canvas) return

    const context = canvas.getContext("2d")
    const photo = photoRef.current

    if (!context || !photo) return

    context.fillStyle = "#f1f5f9"
    context.fillRect(0, 0, canvas.width, canvas.height)

    const data = canvas.toDataURL("image/png")
    photo.setAttribute("src", data)
  }

  function handleTakePhoto() {
    const canvas = canvasRef.current

    if (!canvas) return

    const context = canvas.getContext("2d")
    const video = videoRef.current
    const photo = photoRef.current

    if (!context || !video || !photo) return

    if (WIDTH && height) {
      canvas.width = WIDTH
      canvas.height = height
      context.drawImage(video, 0, 0, WIDTH, height)

      const data = canvas.toDataURL("image/png")
      photo.setAttribute("src", data)

      setPhotos((prev) => {
        const image = new Image()
        image.src = data

        return [...prev, image]
      })
    } else {
      clearCameraOutput()
    }
  }

  function handleClearList() {
    setPhotos([])
  }

  async function handleCreateVideo() {
    const canvas = canvasOutputRef.current
    const video = videoOutputRef.current

    if (!canvas || !video) return

    const context = canvas.getContext("2d")

    if (!context) return

    const height = photos.length * 240
    const frameRate = 15
    canvas.width = 320
    canvas.height = height
  }

  useEffect(() => {
    let cleanUp: () => void = () => {}

    const startCapture = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const message = "getUserMedia() is not supported by your browser"
        throw new Error(message)
      }

      if (!videoRef.current || !canvasRef.current) return

      const video = videoRef.current
      const canvas = canvasRef.current

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })

        video.srcObject = stream
        video.play()

        const handleCanPlayEvent = () => {
          if (!isStreaming) {
            const height = (video.videoHeight / video.videoWidth) * WIDTH

            video.setAttribute("width", WIDTH + "")
            video.setAttribute("height", height + "")
            canvas.setAttribute("width", WIDTH + "")
            canvas.setAttribute("height", height + "")

            setIsStreaming(true)
            setHeight(height)
          }
        }

        video.addEventListener("canplay", handleCanPlayEvent, false)

        clearCameraOutput()

        cleanUp = () => {
          video.removeEventListener("canplay", handleCanPlayEvent, false)
        }
      } catch (err) {
        console.log("An error occurred: " + err)
      }
    }

    startCapture()

    return cleanUp
  }, [videoRef.current])

  return (
    <div className={styles.Photo}>
      <div className={styles.Camera}>
        <video ref={videoRef} className={styles.Video}>
          Video stream not available yet.
        </video>

        <canvas ref={canvasRef} className={styles.Canvas} />

        <img
          ref={photoRef}
          alt="The screen capture will appear in this box."
          className={styles.Picture}
        />

        {!isStreaming && (
          <LoaderIcon isLoading={!isStreaming} className={styles.Loader} />
        )}
      </div>

      <div className={styles.Actions}>
        <button onClick={handleTakePhoto}>Take Photo</button>
        <button onClick={handleClearList}>Clear List</button>
        <button onClick={handleCreateVideo}>Create Video</button>
      </div>

      <div className={styles.PictureGrid}>
        {photos.length} Frames
        <div className={styles.PictureList}>
          {photos.map((photo) => (
            <img key={photo.src} src={photo.src} alt="Photo" />
          ))}
        </div>
      </div>

      <div className={styles.Output}>
        <video ref={videoOutputRef} className={styles.VideoOutput} controls />

        <canvas ref={canvasOutputRef} className={styles.CanvasOutput} />
      </div>
    </div>
  )
}

export { Photo }
