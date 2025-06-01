import React from "react";
import { useParams } from "react-router-dom";
import { trainingPrograms } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { scrollUp } from "../../utils/reusableFuntions";
import MainButton from "../UI/MainButton";

const ProgramDetails = () => {
  scrollUp();
  const navigate = useNavigate();
  const { name } = useParams();
  const decodedName = decodeURIComponent(name || "");

  const program = trainingPrograms.find((p) => p.name === decodedName);

  if (!program) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Program not found
      </div>
    );
  }

  return (
    <section className="w-full mainDarkBg min-h-screen">
      <section className="mainPX MAX_W mx-auto py-10 text-white">
        <div className="mb-6">
         <MainButton size="medium" className="flex items-center gap-2" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
            <p>Go Back</p>
          </MainButton>
        </div>

        <header className="text-center mb-10">
          <h1 className="text-[30px] font-bold">{program.name}</h1>
        </header>

        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Media */}
          <div className="w-full md:w-[40%] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
            {program.video ? (
              <video
                src={program.video}
                className="w-full h-full object-cover object-center rounded-2xl"
                controls
                muted
                autoPlay
                loop
                playsInline
              />
            ) : (
              <img
                src={program.image}
                alt={program.name}
                className="w-full h-[300px] object-cover rounded-2xl"
              />
            )}
          </div>

          {/* Description & CTA */}
          <div className="w-full md:w-[60%] space-y-6">
            <p className="text-lg">{program.detailedDescription}</p>

            <p className="text-base">
              Every body is different. Whether you're recovering from an injury,
              or simply want to hit a new goal, weight loss, muscle building, or
              endurance, a
              <strong className="font-semibold"> tailored program</strong>{" "}
              ensures you're not just working hard, but smart and safely.
            </p>

            <div className="mt-6">
              <MainButton size="medium" className="BUTTON2 py-[50px]">
                Book a Free Consultation
              </MainButton>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProgramDetails;

// 1explan what it is about
// 3 justify why they need a tailored program ex. bad knees pain in the back and every individ is diferent or have dif goals
// CTA book a consultation
