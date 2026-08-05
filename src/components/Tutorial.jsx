import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const Tutorial = () => {
  const [stepper, setStepper] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const a = JSON.parse(localStorage.getItem("tutorial"));
      if (a === true) return;
      else setShow(true);
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (stepper > 13) {
      setShow(false);
      localStorage.setItem("tutorial", JSON.stringify(true));
    }
  }, [stepper]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute top-0 left-0 h-screen w-screen bg-black/60 backdrop-blur-lg text-white font-spirit p-10 px-50 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="left-1/2 -translate-x-1/2 absolute text-8xl font-bold">
            A quick tutorial
          </h1>
          <AnimatePresence mode="wait">
            <motion.div
              key={stepper}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.35 }}
              className="flex justify-center items-center h-full text-4xl"
            >
              {stepper === 0 ? (
                <p>
                  Welcome to Prism, an infinite workspace tool that can help you
                  visualise your notes and projects, so you can finally bring
                  your ideas into focus.
                </p>
              ) : stepper === 1 ? (
                <p>A couple things to note before you get started:</p>
              ) : stepper === 2 ? (
                <p>
                  <span className="text-yellow-300">
                    Prism is under active development.
                  </span>{" "}
                  You may notice features changing or new functionality
                  appearing over time. We're constantly improving the experience
                  and appreciate your patience as Prism evolves.
                </p>
              ) : stepper === 3 ? (
                <p>Now, let's talk about how to use Prism.</p>
              ) : stepper === 4 ? (
                <div className="flex gap-10 items-center">
                  <p>
                    <span className="font-bold">Creating cards:</span> Drag a
                    card from the sidebar onto the canvas to create it. Move
                    cards freely by dragging them anywhere on the workspace.
                  </p>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    width={400}
                    className="rounded-xl border border-white/10"
                  >
                    <source src="/AddingCards.mp4" type="video/mp4" />
                  </video>
                </div>
              ) : stepper === 5 ? (
                <div className="flex gap-10 items-center">
                  <p>
                    <span className="font-bold">Deleting cards:</span> Select
                    the card you want to remove and press the Delete key on your
                    keyboard.
                  </p>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    width={400}
                    className="rounded-xl border border-white/10"
                  >
                    <source src="/Deleting.mp4" type="video/mp4" />
                  </video>
                </div>
              ) : stepper === 6 ? (
                <div className="flex gap-10 items-center">
                  <p>
                    <span className="font-bold">Connecting cards:</span> Drag
                    from one grey connector to another to create a relationship
                    between two cards.
                  </p>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    width={400}
                    className="rounded-xl border border-white/10"
                  >
                    <source src="/Connections.mp4" type="video/mp4" />
                  </video>
                </div>
              ) : stepper === 7 ? (
                <div className="flex gap-10 items-center">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-white transition-colors group-hover:text-white inline mr-2"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                      <path d="m15 5 4 4" />
                    </svg>
                    <span className="font-bold">Note Card:</span> Capture ideas,
                    notes, and research. Add a title and write freely in the
                    text field.
                  </p>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    width={400}
                    className="rounded-xl border border-white/10"
                  >
                    <source src="/Notecard.mp4" type="video/mp4" />
                  </video>
                </div>
              ) : stepper === 8 ? (
                <div className="flex gap-10 items-center">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-white transition-colors group-hover:text-white inline mr-2"
                    >
                      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <path d="m9 14 2 2 4-4" />
                    </svg>{" "}
                    <span className="font-bold">Task Card: </span>Organize tasks
                    and deadlines. Type a task and press Enter, or click the +
                    button to add it.
                  </p>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    width={400}
                    className="rounded-xl border border-white/10"
                  >
                    <source src="/Taskcard.mp4" type="video/mp4" />
                  </video>
                </div>
              ) : stepper === 9 ? (
                <div className="flex gap-10 items-center">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-white transition-colors group-hover:text-white inline mr-2"
                    >
                      {/* Folder Body */}
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      {/* Front Flap Accent Line */}
                      <path d="M2 10h20" />
                    </svg>{" "}
                    <span className="font-bold">Parent Card:</span> Group
                    related cards into a hierarchy. Connect the green connector
                    of a parent card to the red connector of another Parent Card
                    to make it a child.
                  </p>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    width={400}
                    className="rounded-xl border border-white/10"
                  >
                    <source src="/Parentcard.mp4" type="video/mp4" />
                  </video>
                </div>
              ) : stepper === 10 ? (
                <div className="flex gap-10 items-center">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-white transition-colors group-hover:text-white inline mr-2"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="4"
                        ry="4"
                      ></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span className="font-bold">Imagecard:</span> Add visual
                    context to your workspace by clicking the centre of the card
                    to upload an image.
                  </p>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    width={400}
                    className="rounded-xl border border-white/10"
                  >
                    <source src="/Imagecard.mp4" type="video/mp4" />
                  </video>
                </div>
              ) : stepper === 11 ? (
                <p>
                  Oh, and <span className="font-bold">one last thing:</span>{" "}
                  Prism saves to the cloud{" "}
                  <span className="font-bold">automaticlly!</span> If you aren't
                  signed in, it automatically saves to your browser, but if you
                  are signed in, it saves to the cloud. No need to try{" "}
                  <span className="font-bold">⌘S!</span>
                </p>
              ) : stepper === 12 ? (
                <p>
                  That's all you need to get started. Get ready see your notes
                  and projects in a whole new way.
                </p>
              ) : stepper === 13 ? (
                <p> Good luck, and have fun!</p>
              ) : null}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.button
              key={stepper}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-2/3 rounded-2xl
                    bg-linear-to-r
                  from-violet-500/90
                  via-sky-400/90
                  to-emerald-400/90
                    bg-size-[200%_200%]
                    animate-gradient
                    p-4 text-4xl font-bold"
              onClick={() => {
                setStepper((prev) => prev + 1);
              }}
            >
              {stepper === 0
                ? "Cool!"
                : stepper === 1
                  ? "Okay..."
                  : stepper === 2
                    ? "I'm excited!"
                    : stepper === 3
                      ? "Finally!"
                      : stepper === 4
                        ? "Got it"
                        : stepper === 5
                          ? "Got it"
                          : stepper === 6
                            ? "Got it"
                            : stepper === 7
                              ? "Continue"
                              : stepper === 8
                                ? "Continue"
                                : stepper === 9
                                  ? "Continue"
                                  : stepper === 10
                                    ? "Continue"
                                    : stepper === 11
                                      ? "Yay!"
                                      : stepper === 12
                                        ? "Thanks!"
                                        : stepper === 13
                                          ? "Let's get started!"
                                          : null}
            </motion.button>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tutorial;
