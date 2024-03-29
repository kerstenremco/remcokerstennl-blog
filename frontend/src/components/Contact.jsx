import { useEffect, useState } from "react";
export default function Contact() {
  const [state, setState] = useState("init");
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (error) setError(false);
  }, [name, email, message]);
  const handleSend = async (e) => {
    e.preventDefault();
    try {
      if (state !== "init") return;
      setState("sending");
      const res = await fetch(`${import.meta.env.PUBLIC_BACKEND}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });
      if (res.status == 200) {
        setState("send");
      } else throw Error();
    } catch (e) {
      console.error(e);
      setError(true);
      setState("init");
    }
  };
  return (
    <dialog id="contact_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Just send me a message :)</p>
        {error && (
          <div role="alert" class="alert alert-error mb-4">
            <span>Error! Did you fill in the form?</span>
          </div>
        )}
        {state == "send" && (
          <div role="alert" class="alert alert-success mb-4">
            <span>Message sent! Thank you.</span>
          </div>
        )}

        {state != "send" && (
          <div className="*:my-2">
            <label class="input input-primary flex items-center gap-2">
              <box-icon name="envelope-open" class="fill-primary"></box-icon>
              <input
                type="text"
                class="grow"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label class="input input-primary flex items-center gap-2">
              <box-icon name="user-check" class="fill-primary"></box-icon>
              <input
                type="email"
                class="grow"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <textarea
              className="textarea textarea-primary w-full"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
          </div>
        )}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-outline btn-error mr-2">Close</button>
            {state != "send" && (
              <button className="btn btn-success" onClick={handleSend}>
                Send
              </button>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
}
