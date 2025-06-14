import React from "react";
import { WhiteBg } from "./WhiteBg";

const CharacterCues = () => {
  return (
    <div className="text-black garnet-regular sm:text-base text-sm">
      <h1 className="text-3xl font-extrabold font-garnetSemi text-[#43479B] py-4 ">
        Script Format: Character Cues
      </h1>
      <p>
        A character cue is the line of text that precedes dialogue, identifying
        who is speaking. It is always written in ALL CAPSand serves as a clear
        marker for actors, readers, and production teams to attribute lines of
        dialogue to the correct character.
      </p>
      <br></br>
      <p>
        At Screenplay.ink, character cues are automatically formatted to
        industry standards, ensuring consistent placement and spacing without
        manual effort. This guide explains the proper usage and conventions of
        character cues for Indian and international screenplays.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Character Cue Basics
      </h1>
      <ul className="list-disc  pl-8">
        <li>
          {" "}
          <span className="font-bold">Placement:- </span>Character cues appear
          centered on the page at a consistent position, 4.2 inches from the
          left margin.{" "}
        </li>
        <li>
          <span className="font-bold">Written in ALL CAPS:-</span> To make them
          stand out clearly.
        </li>
        <li>
          <span className="font-bold">No Colon:-</span> Do not use a colon after
          the character name (e.g., “RAJAN:” is incorrect).
        </li>
        <li>
          <span className="font-bold">Short and Simple:-</span> Use first names
          or recognizable identifiers, avoiding unnecessary details.
        </li>
      </ul>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        How to Introduce a Character Cue
      </h3>
      <p>When a character first appears in the script:</p>
      <ul className="list-disc  pl-8">
        <li>
          Introduce the character in the description with their name in ALL CAPS
          (e.g., RAJAN).
        </li>
        <li>
          Follow up with the character cue when they speak for the first time.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “How to Introduce a Character Cue”:-
      </h3>
      <WhiteBg>
        <p className="text-center mb-4">
          A shadowy figure emerges from the mist—RAJAN, late 30s, wearing a
          worn-out leather jacket. He scans the area cautiously.
        </p>
        <p className="text-center">
          RAJAN
          <br />
          It’s too quiet here… something’s not right.
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        When a Character’s Name Changes
      </h3>
      <p>
        If a character is referred to by an alias or nickname (e.g., “THE
        DOMINATRIX”), and the real name is revealed later, you must remind the
        reader of the original name in parentheses for clarity. This avoids
        confusion when transitioning to the real name.
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “When a Character’s Name Changes”:-
      </h3>
      <WhiteBg>
        <p className="text-center">
          MIRANDA (DOMINATRIX) <br />
          It’s just something I do to get tuition for college.
        </p>
      </WhiteBg>{" "}
      <p className=" mt-2">
        All subsequent dialogue can use just the real name:
      </p>
      <WhiteBg>
        <p className="text-center">
          MIRANDA <br />
          Let’s just focus on the task, okay?
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Off-Screen (O.S.) and Voice-Over (V.O.)
      </h3>
      <p>
        Sometimes a character speaks but is not physically visible onscreen. Use
        (O.S.) or (V.O.) as an extension of the character cue:
      </p>
      <ul className="list-disc  pl-8">
        <li>
          O.S. (Off-Screen): Indicates the character is present in the scene but
          not visible to the audience. Common in situations like someone
          speaking from another room.
        </li>
        <li>
          V.O. (Voice-Over): Indicates narration or dialogue that is heard but
          not spoken by someone within the physical scene.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “Off-Screen (O.S.) and Voice-Over (V.O.)”:-
      </h3>
      <WhiteBg>
        <p className="mb-4 text-center">
          MRS. KIMBEL (O.S.) <br />
          Hello! Over here! In the trees!
        </p>
        <p className="text-center">
          NARRATOR (V.O.) <br />
          And that’s how Rajan’s story began.
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Character Cues for Split Dialogue
      </h3>
      <p>
        If two or more characters speak simultaneously (e.g., during an argument
        or a moment of chaos), their cues can be placed on the same line. Use a
        slash (/) to separate the names:
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Character Cues for Split Dialogue”:-
      </h3>
      <WhiteBg>
        <div className="flex flex-row justify-evenly">
          <p className="text-center">
            RAJAN <br /> Watch out!
          </p>
          <p className="text-center">
            MEERA <br /> Watch out!
          </p>
        </div>
      </WhiteBg>{" "}
      <p>
        Keep these cues short and limited to one line for clarity. If the
        dialogue continues beyond one line, split the speech into separate
        blocks.
      </p>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Anonymous Characters
      </h3>
      <p>
        Avoid using vague or anonymous labels like “MAN’S VOICE” or “STRANGER”
        unless absolutely necessary. Instead, identify the character by name or
        role. Even if the character has not appeared onscreen yet, assigning a
        name adds clarity and avoids confusion for actors and readers.
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Anonymous Characters”:-
      </h3>
      <WhiteBg>
        <p className="text-center leading-loose">
          RAJAN’S FATHER (O.S.)
          <br />
          You were always meant for greater things, son.
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Consistent Character Naming
      </h3>
      <p>
        Be consistent with character cues throughout the script. For example:
      </p>
      <ul className="list-disc  pl-8">
        <li>
          If a character is introduced as “GUARD #1”, continue using the same
          name throughout the script.
        </li>
        <li>
          Avoid switching between similar cues like “GUARD” and “SENTINEL”
          unless it’s a different character.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “Consistent Character Naming”:-
      </h3>
      <WhiteBg>
        <div className="flex flex-col gap-3">
          <p className="text-start mb-2 font-garnetSemi text-pink-500">Incorrect:</p>
          <p className="text-center">
            <span className="block mb-3">
              GUARD #1 <br />
              Who goes there?
            </span>
            SENTINEL <br />
            Don’t let anyone through!
          </p>
          <p className="text-start mt-4 mb-2 font-garnetSemi text-primary-blue">
            Correct:
          </p>
          <p className="text-center">
            <span className="block mb-3">
              GUARD #1 <br />
              Who goes there?
            </span>
            GUARD #1 <br />
            Don’t let anyone through!
          </p>
        </div>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Character Age and Numbering
      </h3>
      <p>
        <span className="font-bold">Age:-</span> A character’s age should be
        written as a numeral, offset by commas.
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Character Age and Numbering”:-
      </h3>
      <ul className="list-disc  pl-8">
        <li>
          Numbering:- Use the number symbol (#) for minor or background
          characters (e.g., GUARD #1, VENDOR #2).
        </li>
      </ul>
      <WhiteBg>
        <p className="text-center my-4">
          RAJAN, 35, adjusts his coat and steps forward.
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Special Notes for Indian Screenplays
      </h3>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">Regional Names:-</span> Use names and
          nicknames that reflect the character’s culture or region (e.g., RAJAN,
          VIKRAM, MEERA). Screenplay.ink supports transliteration for dialogues
          in regional scripts like Hindi, Telugu, Tamil, and Malayalam.{" "}
        </li>
        <li>
          <span className="font-bold">Multilingual Cues:-</span>If a character
          speaks in a different language, indicate it clearly in the cue with
          parentheses.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “Special Notes for Indian Screenplays”:-
      </h3>
      <WhiteBg>
        <p className="text-center">
          MEERA
          <br />
          (IN HINDI)
          <br />
          Tum Kahan se aaye ho?
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Formatting Character Cues in Screenplay.ink
      </h1>
      <p>
        With Screenplay.ink, character cues are automatically aligned and
        formatted to meet industry standards:
      </p>
      <ul className="list-disc  pl-8">
        <li>4.2 inches from the left margin.</li>
        <li>Centered on the page for clean readability.</li>
        <li>
          Voice-over (V.O.) and Off-Screen (O.S.) extensions are handled
          seamlessly.
        </li>
      </ul>
      <br></br>
      <p>
        Whether writing for Bollywood, Tollywood, or international projects, our
        tools ensure your script stays polished and professional.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Common Mistakes to Avoid
      </h1>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">
            Centering Character Cues Improperly:-
          </span>
          Always align cues at the standard position (4.2 inches from the left
          margin).
        </li>
        <li>
          <span className="font-bold">Using Colons:-</span> Avoid using colons
          (e.g., RAJAN:). It’s not correct screenplay format.
        </li>
        <li>
          <span className="font-bold">Switching Character Names:-</span> Once a
          name is set (e.g., VENDOR #1), stick with it throughout the script.
        </li>
        <li>
          <span className="font-bold">Anonymous Spea kers:-</span>Don’t leave
          speakers vague. Even a minor character deserves an identifier.
        </li>
        <li>
          <span className="font-bold">Overloading with Titles:-</span> Avoid
          adding unnecessary titles (e.g., “RAJAN SIR” unless the title has
          narrative significance).
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Final Note
      </h1>
      <p>
        Character cues are essential for guiding actors, readers, and production
        teams. Keep them simple, consistent, and properly formatted. Whether a
        character is speaking on-screen, off-screen, or narrating through a
        voice-over, clear character cues make your screenplay easy to follow.
      </p>
      <br></br>
      <p>
        With Screenplay.ink, you never need to worry about formatting—we take
        care of alignment, spacing, and consistency so you can focus on creating
        unforgettable characters and dialogue.
      </p>
    </div>
  );
};

export default CharacterCues;
