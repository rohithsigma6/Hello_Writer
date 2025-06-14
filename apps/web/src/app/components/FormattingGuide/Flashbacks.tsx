import React from "react";
import { WhiteBg } from "./WhiteBg";

const Flashbacks = () => {
  return (
    <div className="text-black garnet-regular sm:text-base text-sm">
      <h1 className="text-3xl font-extrabold font-garnetSemi text-[#43479B] py-4 ">
        Script Format: Flashbacks
      </h1>
      <p>
        Flashbacks are a powerful storytelling tool that transport the audience
        to events from the past. They provide essential context, reveal hidden
        character motivations, and deepen the emotional resonance of the
        narrative. However, flashbacks should be used sparingly and purposefully
        to avoid disrupting the story's flow.
      </p>
      <br></br>
      <p>
        At Screenplay.ink, formatting flashbacks is automated for clarity and
        consistency, ensuring your script remains clean and professional.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        The Purpose of Flashbacks
      </h1>
      <p>Flashbacks serve the following key purposes: </p>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">Revealing Backstory:- </span>Show past
          events that influence the character’s present actions or emotions.
        </li>
        <li>
          <span className="font-bold">Emphasizing Relationships:-</span>{" "}
          Highlight key moments that define relationships between characters.
        </li>
        <li>
          <span className="font-bold">Creating Mystery or Drama:- </span>
          Gradually reveal information to build tension or resolve conflicts.
        </li>
      </ul>
      <br></br>
      <p>
        Note: A poorly motivated flashback can break the flow of your story.
        Ensure the events shown in the flashback are vital to the plot or
        character development.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        How to Format a Flashback
      </h1>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Beginning the Flashback
      </h3>
      <p>
        Insert the line “BEGIN FLASHBACK:” (in ALL CAPS) as an action element to
        signal the start of the flashback.{" "}
      </p>
      <ul className="list-disc  pl-8">
        <li>Leave two blank lines before “BEGIN FLASHBACK” for clarity.</li>
        <li>
          Follow this with a standard scene heading for the first scene of the
          flashback.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “Beginning the Flashback”:-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          BEGIN FLASHBACK:
          <br />
          INT. OLD HOUSE - NIGHT
          <br />
          Rajan drops the broken picture frame. Shards of glass scatter at his
          feet.
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Spacing and Consistency
      </h3>
      <p>
        The spacing before “BEGIN FLASHBACK” should match the spacing used
        before a scene heading:
      </p>
      <ul className="list-disc  pl-8">
        <li>
          If you triple-space (two blank lines) before a scene heading, you must
          also triple-space before “BEGIN FLASHBACK.”
        </li>
        <li>
          Ensure there’s only one blank line after “BEGIN FLASHBACK” and before
          the scene heading.
        </li>
      </ul>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Scene Headings in Flashbacks
      </h3>
      <ul className="list-disc  pl-8">
        <li>
          Each scene in a flashback must have its own scene heading, even if it
          occurs in the same location as the character experiencing the
          flashback.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “Scene Headings in Flashbacks”:-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          BEGIN FLASHBACK:
          <br />
          INT. SCHOOL CLASSROOM - DAY
          <br />
          MEERA, 15, stares out the window as the teacher drones on.
          <br />
          EXT. SCHOOLYARD - DAY
          <br />
          Meera runs with a notebook clutched in her hand, tears streaming down
          her face.
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Ending the Flashback
      </h3>
      <p>
        Use the line “END FLASHBACK.” (in ALL CAPS with a period) as an action
        element to mark the return to the present timeline.
      </p>
      <ul className="list-disc  pl-8">
        <li>
          After ending the flashback, include a new scene heading for the
          location where the story resumes.
        </li>
        <li>
          Do not use a slug line like “BACK TO SCENE” since the flashback is
          considered a separate scene.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “Ending the Flashback”:-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          END FLASHBACK.
          <br />
          INT. RAJAN’S ROOM - NIGHT
          <br />
          Rajan wipes a tear and picks up the same broken picture frame.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Single-Scene Flashbacks
      </h1>
      <p>
        If a flashback consists of only one scene, you can simplify the
        formatting by appending “(FLASHBACK)” to the scene heading instead of
        using “BEGIN FLASHBACK” and “END FLASHBACK.”
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Single-Scene Flashbacks”:-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          INT. RAJAN’S CHILDHOOD HOME - NIGHT (FLASHBACK)
          <br />
          The old ceiling fan creaks as RAJAN, 10, huddles under a torn blanket.
        </p>
      </WhiteBg>

      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Dreams and Fantasy Sequences
      </h1>
      <p>
        The same formatting conventions apply to dreams, fantasy sequences, or
        hallucinations. Use clear headings like “BEGIN DREAM SEQUENCE” and “END
        DREAM SEQUENCE” to differentiate these from flashbacks.
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Dreams and Fantasy Sequences”:-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          BEGIN DREAM SEQUENCE:
          <br />
          EXT. DESERT - DAY
          <br />
          Rajan walks alone, the ground cracking beneath his feet.
          <br />
          END DREAM SEQUENCE.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Transitions in and Out of Flashbacks
      </h1>
      <p>
        To ensure smooth transitions into flashbacks, focus on the character’s
        emotional state or a specific object that triggers the memory. The
        audience must understand why the flashback is happening.
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Transitions in and Out of Flashbacks”:-
      </h3>
      <WhiteBg>
        <p className="text-start mb-6">
          Rajan picks up the dusty cricket bat, staring at it for a long moment.
        </p>
        <p className="text-start leading-loose">
          BEGIN FLASHBACK:
          <br />
          EXT. PLAYGROUND - DAY
          <br />A YOUNG RAJAN swings the bat as friends cheer him on.
        </p>
      </WhiteBg>

      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Avoid Overusing Flashbacks
      </h1>
      <p>
        While flashbacks are useful, overusing them can make your script feel
        disjointed and slow the pacing.{" "}
      </p>
      <ul className="list-disc  pl-8">
        <li>
          Follow these guidelines: Motivate the Flashback: The flashback should
          add vital information to the present narrative.
        </li>
        <li>Keep it Short: Limit flashbacks to the essential moments.</li>
        <li>
          Focus on Reactions: The character’s emotional reaction to the memory
          is often as important as the memory itself.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Handling Flashbacks in Screenplay.ink
      </h1>
      <p>With Screenplay.ink, formatting flashbacks is seamless: </p>
      <ul className="list-disc  pl-8">
        <li>
          BEGIN FLASHBACK and END FLASHBACK are automatically aligned and styled
          as action elements.
        </li>
        <li>
          Scene headings within flashbacks follow standard conventions for
          clarity.
        </li>
        <li>
          Single-scene flashbacks can be quickly formatted with the
          “(FLASHBACK)” modifier.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Examples of Good Flashback Formatting
      </h1>
      <h3 className="font-semibold  underline pt-4">
        Extended Flashback Example-
      </h3>

      <WhiteBg>
        <p className="text-start leading-loose">
          Rajan stares at the photograph of his father. His hands tremble.
          <br />
          BEGIN FLASHBACK:
          <br />
          INT. SMALL HOUSE - DAY
          <br />
          RAJAN’S FATHER shouts from across the room. Rajan, 12, shrinks into
          the corner.
        </p>

        <p className="text-center my-4">
          RAJAN’S FATHER <br />
          You’re useless! Just like your mother!
        </p>

        <p className="text-start leading-loose">
          END FLASHBACK.
          <br />
          INT. RAJAN’S ROOM - NIGHT
          <br />
          Rajan exhales sharply, clutching the photograph tighter
        </p>
      </WhiteBg>
      <h3 className="font-semibold  underline pt-4">
        Single-Scene Flashback Example:-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          INT. RAILWAY STATION - DAY (FLASHBACK)
          <br />
          MEERA waves frantically as the train begins to pull away. RAJAN stands
          frozen on the platform.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Key Do’s and Don’ts
      </h1>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">Do:</h3>
      <ul className="list-disc  pl-8">
        <li>
          Use flashbacks only when essential to the plot or character
          development.
        </li>
        <li>Make clear transitions into and out of flashbacks.</li>
        <li>Keep flashbacks concise and emotionally relevant.</li>
      </ul>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">Don’t:</h3>
      <ul className="list-disc  pl-8">
        <li>Use flashbacks as a substitute for good storytelling.</li>
        <li>Overload the script with unnecessary flashbacks.</li>
        <li>
          Use “BACK TO SCENE” after a flashback—resume with a standard scene
          heading instead.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Final Note
      </h1>
      <p className="font-garnetMe">
        Flashbacks add emotional depth and context when used effectively.
        Whether revealing a childhood trauma, a lost relationship, or a critical
        event, flashbacks should feel purposeful and seamlessly integrated into
        the narrative.
      </p>
      <br></br>
      <p className="font-garnetMe">
        With Screenplay.ink, flashback formatting is automated, ensuring clean,
        professional presentation while you focus on crafting impactful memories
        that resonate with the audience.
      </p>
    </div>
  );
};

export default Flashbacks;
