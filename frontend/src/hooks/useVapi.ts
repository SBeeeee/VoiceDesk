"use client";
import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

type CallStatus = "idle" | "connecting" | "active" | "ended";

export const useVapi = (assistantId: string | undefined) => {
    const vapiRef = useRef<Vapi | null>(null);

    const [status, setStatus] = useState<CallStatus>("idle");
    const [isMuted, setIsMuted] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0); // 0–1 for visualizer
    const [transcript, setTranscript] = useState<{ role: string; text: string }[]>([]);

    useEffect(() => {
        const pubKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY as string;
        console.log("Vapi init. Public Key exists?", !!pubKey);
        // Initialize Vapi with your PUBLIC key
        const vapi = new Vapi(pubKey);
        vapiRef.current = vapi;

        vapi.on("call-start", () => setStatus("active"));
        vapi.on("call-end", () => setStatus("ended"));
        vapi.on("error", () => setStatus("idle"));

        vapi.on("volume-level", (vol: number) => setVolumeLevel(vol));

        vapi.on("message", (msg: any) => {
            // Capture live transcript
            if (msg.type === "transcript" && msg.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev,
                    { role: msg.role, text: msg.transcript },
                ]);
            }
        });

        return () => {
            vapi.stop();
        };
    }, []);

    const startCall = async () => {
        console.log("StartCall triggered. assistantId:", assistantId);
        if (!assistantId) {
            console.error("No assistantId provided to useVapi.");
            return;
        }
        setStatus("connecting");
        setTranscript([]);
        try {
            console.log("Starting vapi call...");
            await vapiRef.current?.start(assistantId);
        } catch (err) {
            console.error("Vapi start error:", err);
            setStatus("idle");
        }
    };

    const endCall = () => {
        vapiRef.current?.stop();
        setStatus("ended");
    };

    const toggleMute = () => {
        const muted = vapiRef.current?.isMuted();
        vapiRef.current?.setMuted(!muted);
        setIsMuted(!muted);
    };

    return {
        status,
        isMuted,
        volumeLevel,
        transcript,
        isIdle: status === "idle",
        isConnecting: status === "connecting",
        isActive: status === "active",
        isEnded: status === "ended",
        startCall,
        endCall,
        toggleMute,
    };
};