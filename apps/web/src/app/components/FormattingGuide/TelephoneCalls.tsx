import React from "react";
import { WhiteBg } from "./WhiteBg";

const TelephoneCalls = () => {
  return (
    <div className="text-black garnet-regular sm:text-base text-sm">
      <h1 className="text-3xl font-extrabold font-garnetSemi text-[#43479B] py-4 ">
        Script Format: Telephone Calls
      </h1>
      <p className="garnetMed">
        Telephone conversations in a screenplay can be presented in several
        ways, depending on:{" "}
      </p>
      <ul className="list-disc  pl-8">
        <li>
          Which character is the focus (the caller, the recipient, or both).
        </li>
        <li>How much of the conversation needs to be heard.</li>
        <li>
          The editor's latitude: Whether you want to cut between both characters
          or remain focused on one side.
        </li>
      </ul>
      <p className="garnetMed">
        Telephone calls need to be clear and uncluttered. Overcomplicating their
        format can confuse the reader and break
      </p>
      <p className="garnetMed">
        In Screenplay.ink, telephone conversations are formatted effortlessly,
        ensuring they meet industry standards while giving you flexibility in
        presenting the call.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Showing Both Sides of the Call: INTERCUT
      </h1>
      <p className="garnetMed">
        The most common and dynamic way to present telephone calls is by
        intercutting between two locations. This approach allows the reader to
        see both characters as the conversation progresses.
      </p>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        How to Format:
      </h3>
      <ul className="list-disc  pl-8">
        <li>
          Establish the first location (where the call begins) with a standard
          scene heading.
        </li>
        <li>
          Write the action describing the character dialing or answering the
          phone.
        </li>
        <li>
          Insert the personal direction (into phone) under the character cue to
          clarify that the character is speaking into a phone.
        </li>
        <li>Establish the second location with a scene heading.</li>
        <li>
          Use the action element “INTERCUT WITH” to indicate the back-and-forth
          between the two locations.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">Example:-</h3>
      <WhiteBg>
        <div className="flex flex-col gap-2">
          <p className="text-start leading-loose">
            INT. RAJAN’S OFFICE - DAY
            <br />
            Rajan grabs the phone, dials furiously.
          </p>
          <p className="text-center">
            RAJAN <br />
            (into phone) <br />
            Meera? Tell me you have the file.
          </p>
          <p className="text-start leading-loose">
            INT. MEERA’S APARTMENT - DAY
            <br />
            Meera shuffles through papers on her desk, her phone cradled between
            her ear and shoulder.
          </p>
          <p className="text-center">
            MEERA <br />
            (into phone) <br />
            I found it, Rajan. <br />
            But you’re not going to like what it says.
          </p>
          <p className="text-start">INTERCUT WITH Rajan’s office. </p>
          <p className="text-center mb-2">
            RAJAN <br />
            What do you mean? Spit it out.
          </p>
          <p className="text-center">
            MEERA <br />
            The deal’s off. We’re too late.
          </p>
        </div>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Focusing on One Character: Single-Sided Call
      </h1>
      <p className="garnetMed">
        Sometimes, you may want to focus solely on one character during the call
        without showing or hearing the other side of the conversation. This
        approach keeps the audience aligned with the onscreen character’s
        experience.
      </p>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        How to Format:
      </h3>
      <ul className="list-disc  pl-8">
        <li>
          Use personal direction such as (into phone) to clarify that the
          character is speaking on the phone.{" "}
        </li>
        <li>
          Insert a parenthetical beat to indicate the unseen pauses or gaps in
          the conversation when the character listens or reacts.
        </li>
        <li>Avoid writing dialogue for the unseen party.</li>
      </ul>
      <h3 className="font-semibold  underline pt-4">Example:-</h3>
      <WhiteBg>
        <div className="flex flex-col gap-2">
          <p className="text-start leading-loose">
            INT. RAJAN’S OFFICE - NIGHT
            <br />
            Rajan holds the phone to his ear, pacing the room.
          </p>
          <p className="text-center mb-2">
            RAJAN <br />
            (into phone) <br />
            What do you mean he’s gone?
          </p>

          <p className="text-center">
            RAJAN <br />
            (beat, listening)
          </p>
          <p className="text-center">
            That’s not possible. I was just with <br /> him yesterday!
          </p>
          <p>Rajan slams the phone down, panic spreading across his face. </p>
        </div>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Hearing Both Characters Without Intercutting
      </h1>
      <p className="garnetMed">
        If it’s important for the audience to hear both sides of the
        conversation, but you want to remain in a single location, use a
        combination of (V.O.) and personal directions like “(over phone,
        filtered).”
      </p>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        When to Use V.O. and Filtered:
      </h3>
      <ul className="list-disc  pl-8">
        <li>
          (V.O.): For the character whose voice is heard over the phone but who
          is not physically present in the scene.{" "}
        </li>
        <li>
          (over phone, filtered): Used to indicate that the speech is coming
          through the phone line.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">Example:-</h3>
      <WhiteBg>
        <div className="flex flex-col gap-2">
          <p className="text-start leading-loose">
            INT. MEERA’S LIVING ROOM - NIGHT
            <br />
            Meera sits in the dark, clutching her phone.
          </p>
          <p className="text-center mb-2">
            RAJAN (V.O.) <br />
            (over phone, filtered) <br />
            Meera, I need you to trust me.Just get out of the house.
          </p>
          <p className="text-center mb-2">
            MEERA <br />
            Trust you? After everything you’ve done?
          </p>
          <p className="text-center mb-2">
            RAJAN (V.O.) <br />
            Please. You’re in danger.
          </p>
          <p>
            Meera’s eyes widen. She drops the phone and runs toward the door.
          </p>
        </div>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Unseen Characters and O.S.
      </h1>
      <p className="garnetMed">
        If a character is speaking off-screen but present in the same setting
        (e.g., on speakerphone or in another room), use the extension (O.S.)
        instead of (V.O.).
      </p>
      <h3 className="font-semibold  underline pt-4">Example:-</h3>
      <WhiteBg>
        <div className="flex flex-col gap-2">
          <p className="text-start leading-loose">
            INT. RAJAN’S OFFICE - DAY
            <br />
            Rajan works on his laptop as MEERA’S VOICE comes through the
            speakerphone.
          </p>
          <p className="text-center mb-2">
            MEERA (O.S.) <br />
            Did you get the file?
          </p>
          <p className="text-center">
            RAJAN <br />
            I’m looking at it now. Hold on.
          </p>
        </div>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Cutting Between Conversations Quickly
      </h1>
      <p className="garnetMed">
        If you want to create a sense of urgency or tension by cutting rapidly
        between two characters on the phone, you can use a series of short lines
        with the INTERCUT action element implied.
      </p>
      <h3 className="font-semibold  underline pt-4">Example:-</h3>
      <WhiteBg>
        <div className="flex flex-col gap-2">
          <p>INT. RAJAN’S OFFICE - NIGHT</p>
          <p className="text-center">
            RAJAN <br />
            (into phone) <br />
            Where are you now?
          </p>
          <p className="text-start">INT. DESERTED FACTORY - NIGHT</p>
          <p className="text-start">
            Meera crouches behind a pillar, phone in hand.
          </p>
          <p className="text-center mb-2">
            MEERA <br />
            Somewhere you don’t want to be.
          </p>
          <p className="text-center mb-2">
            RAJAN (o.s) <br />
            Meera, don’t do anything stupid.
          </p>
          <p className="text-center">
            MEERA <br />
            Too late.
          </p>
        </div>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Guidelines for Indian Screenplays
      </h1>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Regional Language Dialogue
      </h3>
      <p className="garnetMed">
        If a character switches to another language (e.g., Tamil, Hindi,
        Telugu), use a parenthetical to clarify:
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Regional Language Dialogue”:-
      </h3>
      <WhiteBg>
        <p className="text-center">
          MEERA <br />
          (in Tamil, into phone) <br />
          Yenna panna pora? (What are you doing?)
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Filtered Voices
      </h3>
      <p className="garnetMed">
        Indian scripts often use "filtered" cues to denote calls on low-quality
        or distant connections (common in thrillers or suspense films).
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Filtered Voices”:-
      </h3>
      <WhiteBg>
        <p className="text-center">
          INSPECTOR RAO (V.O.) <br />
          (over phone, filtered) <br />
          Don’t trust anyone. They’re already inside.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Guidelines for Indian Screenplays
      </h1>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">Over-Formatting:-</span>Avoid writing both
          sides of the conversation when only one character’s perspective
          matters.
        </li>
        <li>
          <span className="font-bold">Unclear Directions:-</span> Use
          parentheticals like “(into phone)” or “(over phone, filtered)” to
          ensure clarity.
        </li>
        <li>
          <span className="font-bold">Wrong Extensions:-</span>Use (V.O.) for
          distant voices and (O.S.) for nearby but unseen voices.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Handling Montages in Screenplay.ink
      </h1>
      <p className="garnetMed">
        With Screenplay.ink, formatting telephone calls is straightforward:{" "}
      </p>
      <ul className="list-disc  pl-8">
        <li>INTERCUT transitions are automated for smooth scene changes.</li>
        <li>
          Parentheticals like (into phone) or (over phone, filtered) are
          consistently aligned for clean presentation.
        </li>
        <li>
          Multilingual dialogue handling ensures clarity for calls featuring
          regional languages.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Final Note
      </h1>
      <p className="garnetMed">
        Telephone calls are a staple of storytelling, often driving tension,
        plot reveals, or emotional stakes. Whether you're intercutting between
        two characters, focusing on one side, or presenting a filtered voice,
        clear formatting ensures your script remains readable and visually
        dynamic.
      </p>
      <br></br>
      <p className="garnetMed">
        With Screenplay.ink, you can easily format professional telephone call
        sequences while staying focused on telling your story.
      </p>
    </div>
  );
};

export default TelephoneCalls;
