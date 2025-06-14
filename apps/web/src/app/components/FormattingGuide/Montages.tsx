import React from "react";
import { WhiteBg } from "./WhiteBg";

const Montages = () => {
  return (
    <div className="text-black garnet-regular sm:text-base text-sm">
      <h1 className="text-3xl font-extrabold font-garnetSemi text-[#43479B] py-4 ">
        Script Format: Montages
      </h1>
      <p className="garnetMed">
        Montages are sequences of short, visual scenes or shots that progress
        the story, convey the passage of time, or build emotional or thematic
        resonance. Whether it’s a training sequence in a sports film, a romantic
        bonding montage in a Bollywood movie, or a series of quick shots showing
        chaos, montages are an efficient and impactful storytelling tool.
      </p>
      <br></br>
      <p className="garnetMed">
        In Screenplay.ink, montages are formatted automatically for clarity and
        consistency, helping writers focus on creativity while adhering to
        professional standards.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Montages vs. Series of Shots
      </h1>
      <p className="garnetMed">
        Screenwriters often confuse montages with a series of shots, but they
        serve different purposes:.
      </p>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Series of Shots
      </h3>
      <ul className="list-disc  pl-8">
        <li>
          A sequence of short, related visuals that occur in a single location
          or focus on a specific action/event.
        </li>
        <li>
          The shots are listed individually, often in outline format (A, B, C).
        </li>
        <li>Ideal for fast-paced action or events that happen sequentially.</li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “Series of Shots”:-
      </h3>
      <WhiteBg>
        <p className="text-start mb-4">
          SERIES OF SHOTS – JONES RUNS ACROSS MUMBAI
        </p>

        <p className="ml-6">
          A) Dodging fruit vendors at Crawford Market.
          <br />
          B) Weaving through traffic at Marine Drive.
          <br />
          C) Sprinting up the stairs of CST Railway Station.
        </p>
      </WhiteBg>

      <h3 className="text-lg font-garnetSemi font-bold  py-2">Montage</h3>
      <ul className="list-disc  pl-8">
        <li>
          A thematic sequence where visuals dissolve into one another to show
          progression, the passage of time, or emotional growth.
        </li>
        <li>Montages often span multiple locations, events, or characters.</li>
        <li>
          Ideal for building to a climax or summarizing a series of events.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">Example for “Montage”:-</h3>
      <WhiteBg>
        <p className="text-start mb-4">
          MONTAGE – MEERA PREPARES FOR HER BIG DAY
        </p>

        <p className="ml-6">
          – Meera carefully ironing her wedding saree. <br />
          – Her mother fastening gold bangles on her wrists. <br />
          – Meera gazing at herself nervously in the mirror.
          <br />– The sun rising outside as guests arrive at the wedding venue.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Formatting a Montage
      </h1>
      <p className="garnetMed">
        Montages follow a specific format to ensure clarity:{" "}
      </p>
      <ul className="list-disc  pl-8">
        <li>
          Start with a Slug Line: Use a clear heading to indicate the montage.
          Example: MONTAGE – RAJAN’S TRAINING SEQUENCE
        </li>
        <li>
          List Individual Shots: Write each shot as a brief description. Use a
          dash (–) to introduce each shot or an alphabetical outline (A, B, C).
        </li>
        <li>
          {" "}
          Wrap Up the Montage: Do not include “END MONTAGE.” Instead, transition
          back to the main action with a standard scene heading.
        </li>
      </ul>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Alphabetical Outline Example
      </h3>
      <p className="garnetMed">
        When writing a montage with short, sequential actions, use an
        alphabetical outline without scene headings.
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Alphabetical Outline”:-
      </h3>
      <WhiteBg>
        <p className="text-start mb-4">MONTAGE – FLATBED TRUCK TRAVELING</p>

        <p className="ml-6">
          A) Ropes hanging from the empty bed whip in the wind.
          <br />
          B) Tires WHINE against the passing highway.
          <br />
          C) The grille vibrates as air WHOOSHES through to mingle with the ROAR
          of the engine.
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Dash-Format Example
      </h3>
      <p className="garnetMed">
        For more thematic or emotional sequences, use a dash (–) for each shot.
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Dash-Format”:-
      </h3>
      <WhiteBg>
        <p className="text-start mb-4">MONTAGE – MEERA AND RAJAN’S JOURNEY</p>

        <p className="ml-6">
          – Rajan teaching Meera to ride a bicycle as she stumbles and laughs.{" "}
          <br />
          – Both of them sharing a quiet moment under the banyan tree. <br />–
          Rajan waving goodbye as Meera boards the Mumbai express train. <br />–
          Meera’s face pressed against the window, hiding tears.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        When to Use a Montage
      </h1>
      <p className="garnetMed">Montages are ideal for:</p>
      <ul className="list-disc  pl-8">
        <li>
          Summarizing Events: Show a series of actions that would take too long
          to show individually.
        </li>
        <li>
          Emotional Development: Illustrate character growth or relationships
          over time.
        </li>
        <li>
          Building Tension: Quick cuts between shots to show rising stakes
          (e.g., preparation for a big heist or climactic event).
        </li>
        <li>
          Highlighting Time Passages: Visuals that show days, weeks, or years
          passing in a condensed format.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Ending a Montage
      </h1>
      <p className="garnetMed">
        Unlike flashbacks, there is no need to explicitly write “END MONTAGE.”
        Instead:{" "}
      </p>
      <ul className="list-disc  pl-8">
        <li>Use a new scene heading to indicate where the story resumes.</li>
        <li>
          The audience naturally understands that the montage has concluded when
          a new location or event is introduced.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “Ending a Montage”:-
      </h3>
      <WhiteBg>
        <p className="text-start mb-4">MONTAGE – MEERA AND RAJAN’S JOURNEY</p>

        <p className="ml-6">
          MONTAGE – RAJAN PREPARES FOR HIS FIRST MATCH – Rajan running up the
          steps of an old stadium. <br />
          – A coach nodding approvingly as Rajan lifts weights. <br />– Rajan
          bandaging his wrists, determined.
        </p>

        <p className="text-start leading-loose mt-4">
          EXT. CRICKET FIELD – DAY
          <br />
          Rajan steps onto the field, bat in hand. The crowd erupts in cheers.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Montages in Indian Screenplays
      </h1>
      <p className="garnetMed">
        In Indian cinema, montages are commonly used in:
      </p>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">Song Sequences:-</span> Bollywood songs
          often act as montages to show love, heartbreak, or
          celebration.Example: A romantic song showing two lovers bonding in
          different settings (parks, cafes, beaches).
        </li>
        <li>
          <span className="font-bold">Training or Preparation Sequences:-</span>{" "}
          Characters preparing for a climactic event (e.g., sports matches,
          exams, or heists).
        </li>
        <li>
          <span className="font-bold">Family Drama:-</span> Moments that
          summarize family dynamics over time (e.g., weddings, festivals, or
          birthdays).
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Common Mistakes to Avoid
      </h1>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">Writing Montages as Paragraphs:-</span>{" "}
          Break visuals into clear, individual shots. Avoid writing them as
          blocks of text.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">Example:-</h3>
      {/*  */}
      <WhiteBg>
        <div className="flex flex-col gap-3">
          <p className="text-start mb-2 font-garnetSemi text-pink-500">Incorrect:</p>
          <p className="text-start">
            Writing Montages as Paragraphs: Break visuals into clear, individual
            shots. Avoid writing them as blocks of text.
          </p>
          <p className="text-start mt-4 mb-2 font-garnetSemi text-primary-blue">
            Correct:
          </p>
          <p className="text-start mb-4">
            MONTAGE – MEERA PREPARES FOR HER WEDDING
          </p>

          <p className="ml-6">
            – Meera carefully ironing her saree. <br />
            – Her mother fastening gold bangles on her wrists. <br />– The sun
            rising as guests arrive at the venue.
          </p>
        </div>
      </WhiteBg>
      <ul className="list-disc  pl-8 mt-2">
        <li>
          <span className="font-bold">Overusing Montages:-</span>Montages are
          powerful but lose their impact if overused. Reserve them for moments
          that truly require condensed storytelling.
        </li>
        <li>
          <span className="font-bold">Random or Unrelated Shots:-</span>Montages
          must be coherent and build toward a clear narrative or emotional
          outcome. Avoid random or disconnected visuals.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Handling Montages in Screenplay.ink
      </h1>
      <p className="garnetMed">
        With Screenplay.ink, formatting montages is intuitive and seamless:
      </p>
      <ul className="list-disc  pl-8">
        <li>
          Automatically align dashes (–) or outline markers (A, B, C) for clear
          presentation.
        </li>
        <li>Use industry-standard spacing to ensure readability.</li>
        <li>Simplify transitions out of montages with clean scene headings.</li>
      </ul>
      <br></br>
      <p className="garnetMed">
        Whether you're writing a romantic Bollywood montage, a sports training
        sequence, or a dramatic emotional journey, Screenplay.ink helps you
        bring it to life with precision.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Final Note
      </h1>
      <p className="garnetMed">
        Montages are a visual and rhythmic storytelling tool that allows
        screenwriters to show progression, emotion, and action efficiently. Use
        them purposefully to enhance your screenplay without losing focus on the
        larger narrative.
      </p>
      <br></br>
      <p className="garnetMed">
        With Screenplay.ink, formatting montages becomes effortless, so you can
        focus on crafting sequences that captivate your audience.
      </p>
    </div>
  );
};

export default Montages;
