"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [volume, setVolume] = useState(0.2)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)

  // Initialize audio
  useEffect(() => {
    // Only initialize after user interaction
    if (!hasInteracted) return

    try {
      // Create audio context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      audioContextRef.current = new AudioContext()

      // Create gain node for volume control
      const gainNode = audioContextRef.current.createGain()
      gainNode.gain.value = volume
      gainNode.connect(audioContextRef.current.destination)
      gainNodeRef.current = gainNode

      // Load ambient sound
      fetch("/sounds/ambient-neural.mp3")
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => audioContextRef.current!.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          // Create source node
          const source = audioContextRef.current!.createBufferSource()
          source.buffer = audioBuffer
          source.loop = true
          source.connect(gainNodeRef.current!)
          sourceRef.current = source

          // Start playing
          source.start()
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error("Error loading audio:", error)
        })
    } catch (error) {
      console.error("Error initializing audio:", error)
    }

    return () => {
      // Clean up audio
      if (sourceRef.current) {
        sourceRef.current.stop()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [hasInteracted, volume])

  // Handle volume change
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume
    }
  }, [volume])

  // Toggle play/pause
  const togglePlay = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      return
    }

    if (isPlaying && sourceRef.current) {
      sourceRef.current.stop()
      sourceRef.current = null
      setIsPlaying(false)
    } else if (!isPlaying && audioContextRef.current && gainNodeRef.current) {
      // Reload and play audio
      fetch("/sounds/ambient-neural.mp3")
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => audioContextRef.current!.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          const source = audioContextRef.current!.createBufferSource()
          source.buffer = audioBuffer
          source.loop = true
          source.connect(gainNodeRef.current!)
          sourceRef.current = source
          source.start()
          setIsPlaying(true)
        })
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/60"
        onClick={togglePlay}
        title={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      >
        {isPlaying ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4 text-white/70" />}
      </Button>
    </div>
  )
}
