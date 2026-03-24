import React, { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack, Settings } from "lucide-react"

export function HLSVideoPlayer({ video, onTimeUpdate, onEnded }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [quality, setQuality] = useState("auto")
  const [isBuffering, setIsBuffering] = useState(false)
  const [showQualityMenu, setShowQualityMenu] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleLoadStart = () => setIsBuffering(true)
    const handleCanPlay = () => setIsBuffering(false)

    videoEl.addEventListener("play", handlePlay)
    videoEl.addEventListener("pause", handlePause)
    videoEl.addEventListener("loadstart", handleLoadStart)
    videoEl.addEventListener("canplay", handleCanPlay)

    return () => {
      videoEl.removeEventListener("play", handlePlay)
      videoEl.removeEventListener("pause", handlePause)
      videoEl.removeEventListener("loadstart", handleLoadStart)
      videoEl.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const newTime = videoRef.current.currentTime
      setCurrentTime(newTime)
      onTimeUpdate?.(newTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration)
  }

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    if (videoRef.current) videoRef.current.currentTime = newTime
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      videoRef.current.muted = newVolume === 0
      setIsMuted(newVolume === 0)
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const toggleFullscreen = () => {
    if (videoRef.current?.parentElement) {
      if (document.fullscreenElement) document.exitFullscreen()
      else videoRef.current.parentElement.requestFullscreen()
    }
  }

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden group">
      <div className="relative w-full aspect-video bg-black">
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-30">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex flex-col justify-end opacity-0 group-hover:opacity-100 p-4">
           {/* Basic Control UI */}
           <div className="flex items-center gap-4 text-white">
             <button onClick={togglePlay}>{isPlaying ? <Pause size={20}/> : <Play size={20}/>}</button>
             <span className="text-xs">{formatTime(currentTime)} / {formatTime(duration)}</span>
             <button onClick={toggleFullscreen} className="ml-auto"><Maximize size={20}/></button>
           </div>
        </div>
      </div>
    </div>
  )
}