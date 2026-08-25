"use client";

import Image from "next/image";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";

const triggerWord = "каспи";

const team = [
  { name: "Никита Бузин", photo: "/team/nikita-buzin.png" },
  { name: "Глеб Касимов", photo: "/team/gleb-kasimov.png" },
  { name: "Артур Камалов", photo: "/team/artur-kamalov.png" },
  { name: "Юля Алексеева", photo: "/team/yulia-alekseeva.png" },
  { name: "Артём Гостев", photo: "/team/artem-gostev.jpg" },
] as const;

const sparks = Array.from({ length: 32 }, (_, index) => index);
const ribbonItems = Array.from({ length: 9 }, (_, index) => index);

type OrbitStyle = CSSProperties & {
  "--egg-angle": string;
  "--egg-delay": string;
  "--egg-duration": string;
};

type SparkStyle = CSSProperties & {
  "--spark-x": string;
  "--spark-delay": string;
  "--spark-duration": string;
  "--spark-size": string;
};

export function TeamEasterEgg() {
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const typedRef = useRef("");
  const [typed, setTyped] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const focusHiddenInput = () => {
      if (document.visibilityState === "visible") {
        inputRef.current?.focus({ preventScroll: true });
      }
    };

    const focusTimer = window.setTimeout(focusHiddenInput, 0);
    window.addEventListener("focus", focusHiddenInput);
    document.addEventListener("visibilitychange", focusHiddenInput);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("focus", focusHiddenInput);
      document.removeEventListener("visibilitychange", focusHiddenInput);
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const previousOverflow = document.body.style.overflow;
    const anthemAudio = audioRef.current;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsActive(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      if (anthemAudio) {
        anthemAudio.pause();
        anthemAudio.currentTime = 0;
      }
    };
  }, [isActive]);

  const playAnthem = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.volume = 0.72;
    void audioRef.current.play().catch(() => undefined);
  }, []);

  const handleTyping = useCallback((value: string) => {
    const normalized = value.toLocaleLowerCase("ru-RU").slice(-triggerWord.length);
    typedRef.current = normalized;
    setTyped(normalized);

    if (normalized === triggerWord) {
      typedRef.current = "";
      setTyped("");
      playAnthem();
      setIsActive(true);
    }
  }, [playAnthem]);

  useEffect(() => {
    const captureTyping = (event: KeyboardEvent) => {
      if (isActive || event.ctrlKey || event.metaKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const isAnotherEditableElement =
        target !== inputRef.current &&
        (target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.isContentEditable);
      if (isAnotherEditableElement) return;

      if (event.key === "Backspace") {
        handleTyping(typedRef.current.slice(0, -1));
        return;
      }

      if (event.key.length === 1) {
        handleTyping(typedRef.current + event.key);
      }
    };

    window.addEventListener("keydown", captureTyping, true);
    return () => window.removeEventListener("keydown", captureTyping, true);
  }, [handleTyping, isActive]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/kazakhstan-anthem.mp3"
        preload="auto"
        onEnded={() => setIsActive(false)}
      />
      <input
        ref={inputRef}
        type="text"
        value={typed}
        readOnly
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        tabIndex={-1}
        aria-label="Скрытое поле пасхалки"
        className="pointer-events-none fixed inset-0 z-[190] h-screen w-screen cursor-default opacity-0"
      />

      {isActive ? (
        <div
          className="easter-stage fixed inset-0 z-[200] overflow-hidden"
          role="dialog"
          aria-label="Праздничная анимация команды"
          onClick={() => setIsActive(false)}
        >
          <div className="easter-glow easter-glow-left" />
          <div className="easter-glow easter-glow-right" />

          <div className="easter-depth-scene" aria-hidden="true">
            <span className="easter-depth-ring easter-depth-ring-one" />
            <span className="easter-depth-ring easter-depth-ring-two" />
            <span className="easter-depth-ring easter-depth-ring-three" />
          </div>

          <div className="easter-ribbon easter-ribbon-back" aria-hidden="true">
            {ribbonItems.map((item) => (
              <span key={item}>✦ ҚАЗАҚСТАН ◆ БІРЛІК ◆</span>
            ))}
          </div>

          {sparks.map((spark) => (
            <span
              key={spark}
              className="easter-spark"
              style={
                {
                  "--spark-x": `${4 + ((spark * 37) % 92)}vw`,
                  "--spark-delay": `${(spark % 7) * -0.42}s`,
                  "--spark-duration": `${3.2 + (spark % 5) * 0.45}s`,
                  "--spark-size": `${8 + (spark % 4) * 5}px`,
                } as SparkStyle
              }
            >
              {spark % 3 === 0 ? "◆" : "✦"}
            </span>
          ))}

          <div className="easter-ornament easter-ornament-top" aria-hidden="true">
            ◆ ◇ ◆ ◇ ◆ ◇ ◆
          </div>
          <div className="easter-ornament easter-ornament-bottom" aria-hidden="true">
            ◆ ◇ ◆ ◇ ◆ ◇ ◆
          </div>

          <div className="easter-center">
            <div className="easter-flag-shell">
              <Image
                src="/kazakhstan-flag.svg"
                alt="Флаг Казахстана"
                fill
                unoptimized
                sizes="(max-width: 700px) 64vw, 460px"
                className="object-cover"
                priority
              />
            </div>
            <p className="easter-kicker">Бірлік бар жерде — тірлік бар</p>
            <h2 className="easter-title">Команда в полном составе</h2>
          </div>

          <div className="easter-orbits" aria-label="Участники команды">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="easter-photo-orbit"
                style={
                  {
                    "--egg-angle": `${index * 72 - 90}deg`,
                    "--egg-delay": `${index * -0.16}s`,
                    "--egg-duration": `${7.4 + (index % 2) * 1.2}s`,
                  } as OrbitStyle
                }
              >
                <figure className="easter-photo-jump">
                  <div className="easter-photo-frame">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      unoptimized
                      sizes="150px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </figure>
              </div>
            ))}
          </div>

          <div className="easter-ribbon easter-ribbon-front" aria-hidden="true">
            {ribbonItems.map((item) => (
              <span key={item}>◆ ҚАЗАҚСТАН ✦ АЛҒА ✦</span>
            ))}
          </div>

          <button
            type="button"
            className="easter-close"
            onClick={(event) => {
              event.stopPropagation();
              setIsActive(false);
            }}
            aria-label="Закрыть анимацию"
          >
            ×
          </button>
        </div>
      ) : null}
    </>
  );
}
