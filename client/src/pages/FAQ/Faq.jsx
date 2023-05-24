import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Collapse, Select } from "antd";
import { useState } from "react";
const { Panel } = Collapse;
const { Option } = Select;

const Faq = () => {
  const [expandIconPosition, setExpandIconPosition] = useState("start");
  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };
  const onChange = (key) => {
    console.log(key);
  };
  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  return (
    <div className="m-5">
      <Collapse
        defaultActiveKey={["1"]}
        onChange={onChange}
        expandIconPosition={expandIconPosition}
      >
        <Panel header="Who are we ?" key="1" extra={genExtra()}>
          <div>
            We are students of Dept. Computer Science & Engineering,IIUC. We
            developed to this web application to help our furry friends and
            people who love to care them.
          </div>
        </Panel>
        <Panel
          header="What is this project objective"
          key="2"
          extra={genExtra()}
        >
          <div>
            <ol>
              <li>
                To establish a new pet adoption system that is user-friendly and
                secure, accessible through an online platform and aiming to
                simplify the process of finding a pet to adopt.
              </li>
              <li>
                To increase the visibility and reach of adoptable pets and
                ultimately increase the number of successful adoptions.
              </li>
            </ol>
          </div>
        </Panel>
        <Panel header="Pet Foster Center Features:" key="3" extra={genExtra()}>
          <div>
            <ol>
              <li>
                List pet animals with their breeds and multiple varieties are
                available as pet.
              </li>
              <li>Find foster center through place & date.</li>
              <li>Request pet for adoption & rescue.</li>
              <li>Stripe payment for foster center booking.</li>
              <li>Vet finder & vet pharmacy finder.</li>
              <li>Chat features to communicate more easily.</li>
              <li>User can accept or delete the request for adoption.</li>
              <li>Like or dislike pet.</li>
              <li>Check success stories(all the adopted pets).</li>
              <li>Toys & pet food for pet lovers.</li>
              <li>
                Providing all major adoption-related features on one platform.
              </li>
            </ol>
          </div>
        </Panel>
        <Panel
          header="Technologies used in this project"
          key="4"
          extra={genExtra()}
        >
          <div>
            <h5>Front-end development:</h5>
            <ol>
              <li>Vanila JavaScript</li>
              <li>ReactJS</li>
              <li>EmailJS</li>
              <li>Bootstrap 5</li>
              <li>AntD</li>
            </ol>
            <h5>Backend Development</h5>

            <ol>
              <li>NodeJS</li>
              <li>ExpressJS</li>
            </ol>
            <h5>Database</h5>
            <ol>
              <li>NoSQL</li>
              <li>MongoDB </li>
            </ol>
          </div>
        </Panel>
        <Panel header="Developers" key="5" extra={genExtra()}>
          <div>
            <h5>Developers:</h5>
            <ol>
              <li>Muhammad Arafatul Islam - C181075</li>
              <li>MD. Rasel - C181069</li>
              <li>A S M Saim- C181076</li>
            </ol>
          </div>
        </Panel>
        <Panel
          header="What types of pets can I adopt from your website?"
          key="6"
          extra={genExtra()}
        >
          <div>
            <p>
              Our website primarily lists cats available for adoption, but we
              also occasionally have other types of animals available, such as
              birds, rabbits and so on.
            </p>
          </div>
        </Panel>
        <Panel
          header="How do I adopt a pet from your website? "
          key="7"
          extra={genExtra()}
        >
          <div>
            <p>
              To adopt a pet from our website, you will need to fill out an
              online application form. Once your application is received and
              reviewed, a member of our team will contact you to schedule a meet
              and greet with the pet you are interested in adopting. If the meet
              and greet goes well, you will be required to sign an adoption
              contract and pay an adoption fee.
            </p>
          </div>
        </Panel>
        <Panel
          header="How much does it cost to adopt a pet from your website? "
          key="8"
          extra={genExtra()}
        >
          <div>
            <p>
              The adoption fee for our pets varies depending on the animal and
              its age. Our adoption fees typically range from 100 to 400 on
              daily basis.
            </p>
          </div>
        </Panel>
        <Panel
          header="Q: Can I adopt a pet if I live in an apartment or have a small yard? "
          key="9"
          extra={genExtra()}
        >
          <div>
            <p>
              A: Yes, you can adopt a pet if you live in an apartment or have a
              small yard. However, it's important to consider the specific needs
              and requirements of the pet you are interested in adopting. For
              example, a large multiple type of pets may not be well-suited to
              living in an apartment.
            </p>
          </div>
        </Panel>
        <Panel
          header="Q: What is the process for returning a pet if it doesn't work out? "
          key="10"
          extra={genExtra()}
        >
          <div>
            <p>
              A: If for any reason the adoption does not work out, we ask that
              you contact us immediately. Our team will work with you to find a
              solution that is in the best interest of both you and the pet. In
              some cases, we may ask you to bring the pet back to us for
              re-homing.
            </p>
          </div>
        </Panel>
        <Panel
          header="Q: Can I adopt a pet if I have other pets already? "
          key="11"
          extra={genExtra()}
        >
          <div>
            <p>
              A: Yes, you can adopt a pet if you have other pets already.
              However, we recommend bringing your current pets to meet the new
              pet during the meet and greet to ensure that they are a good
              match.
            </p>
          </div>
        </Panel>
        <Panel
          header="Q: Can I adopt a pet if I have children? "
          key="12"
          extra={genExtra()}
        >
          <div>
            <p>
              A: Yes, you can adopt a pet if you have children. However, it's
              important to consider the specific needs and requirements of the
              pet you are interested in adopting, as well as the age of your
              children. Some pets may not be well-suited to living in a
              household with young children.
            </p>
          </div>
        </Panel>
      </Collapse>
      <br />
    </div>
  );
};

export default Faq;
