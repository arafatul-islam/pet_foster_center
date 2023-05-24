import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Tag } from "antd";
import Success from "../../components/Success/Success";
import Error from "../../components/Error/Error";

const Contact = () => {
  const form = useRef();
  const [success, setSuccess] = useState();
  const [err, setErr] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
      setErr(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [success, err]);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_o8v0562",
        "template_dkvv339",
        form.current,
        "KWLemY-hDAP7gxe1Y"
      )
      .then(
        (result) => {
          console.log(result.text);
          setErr(false);
          setSuccess(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setSuccess(false);
          setErr(true);
        }
      );
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 m-5 p-3 row">
          <center>
            <h3>Contact With Developers</h3>
            <div className="col-md-8">
              <form ref={form} onSubmit={sendEmail} className="text-start mb-3">
                <div>
                  <label>Name</label>
                  <input type="text" name="user_name" />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" name="user_email" />
                </div>
                <div>
                  <div>
                    <label>Message</label>
                  </div>
                  <textarea name="message" className="form-control" rows="3" />
                </div>
                <div className="mt-3">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Send"
                  />
                </div>
              </form>
              {success && <Success> Email Sent Successfully! </Success>}
              {err && <Error> Email not sent! </Error>}
            </div>
          </center>
        </div>
        <div className="col-md-12 mb-5">
          <center style={{ height: "50vh" }}>
            <h3>Visit us: </h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.202160129718!2d91.71888971495821!3d22.496597085221914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad2777a615585d%3A0xdcf908f6e4f3a713!2z4KaG4Kao4KeN4Kak4Kaw4KeN4Kac4Ka-4Kak4Ka_4KaVIOCmh-CmuOCmsuCmvuCmruCngCDgpqzgpr_gprbgp43gpqzgpqzgpr_gpqbgp43gpq_gpr7gprLgp58g4Kaa4Kaf4KeN4Kaf4KaX4KeN4Kaw4Ka-4Kau!5e0!3m2!1sbn!2sbd!4v1674651748583!5m2!1sbn!2sbd"
              width="600"
              height="450"
              style={{ border: "0", width: "100%", height: "80%" }}
              allowFullScreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Contact;
