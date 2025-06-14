import React from "react";
import { WhiteBg } from "./WhiteBg";

const Transitions = () => {
  return (
    <div className="text-black garnet-regular sm:text-base text-sm">
      <h1 className="text-3xl font-extrabold font-garnetSemi text-[#43479B] py-4 ">
        Script Format: Transitions
      </h1>
      <p>
        Transitions are instructions in a screenplay that signify a change in
        time, space, or scene flow. They are used to bridge scenes visually or
        stylistically, often indicating how one scene ends and another begins.
        While transitions are an essential tool for editors and directors, their
        overuse can clutter the script.
      </p>
      <br></br>
      <p>
        In modern screenwriting, most transitions are considered implied, as the
        editor and director decide how scenes flow during post-production.
        However, certain transitions remain relevant in scripts submitted for
        film production, especially for scenes with stylistic shifts or clear
        temporal jumps.
      </p>
      <br></br>
      <p>
        At Screenplay.ink, transitions are automatically formatted to ensure
        proper alignment and spacing, adhering to professional standards used in
        Bollywood, regional Indian cinema, and international markets.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Purpose of Transitions
      </h1>
      <p>Transitions serve three main purposes:</p>
      <ul className="list-disc  pl-8">
        <li>
          Indicating Visual Style: Highlight specific transitions (e.g., a fade
          or dissolve) for storytelling effect.
        </li>
        <li>
          Jumping in Time or Space: Signify time skips, flashbacks, or changes
          in locations.
        </li>
        <li>
          End of the Script or Sequence: To mark scene conclusions clearly.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Common Transitions and Their Usage
      </h1>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">FADE IN</h3>
      <ul className="list-disc  pl-8">
        <li>
          Appears at the very beginning of a script to signify the start of the
          film.
        </li>
        <li>Must be placed at the left margin (aligned with action lines).</li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “FADE IN”:-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          FADE IN: <br />
          INT. MUMBAI CAFE - NIGHT <br />
          Steam rises from cups of chai as RAJAN reads a crumpled letter.
        </p>
      </WhiteBg>

      <h3 className="text-lg font-garnetSemi font-bold  py-2">FADE OUT</h3>
      <ul className="list-disc  pl-8">
        <li>Indicates the end of a scene, sequence, or the entire film.</li>
        <li>Placed on the right margin for clarity.</li>
        <li>Always ends with a period.</li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “FADE OUT”:-
      </h3>
      <WhiteBg>
        <p className="text-end my-2">FADE OUT.</p>
      </WhiteBg>

      <h3 className="text-lg font-garnetSemi font-bold  py-2">DISSOLVE TO</h3>
      <ul className="list-disc  pl-8">
        <li>
          Used to signify a soft, gradual transition between scenes, typically
          to show the passage of time or a connection between events.{" "}
        </li>
        <li>Appears on the right margin, like FADE OUT.</li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “DISSOLVE TO”:-
      </h3>
      <WhiteBg>
        <p className="text-end">DISSOLVE OUT.</p>
        <p className="text-start leading-loose">
          EXT. DESERTED VILLAGE - DAY
          <br />
          The wind carries a tattered newspaper across the dirt road.
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">FADE TO BLACK</h3>
      <ul className="list-disc  pl-8">
        <li>
          Marks the end of the film or an extended pause in the narrative.{" "}
        </li>
        <li>
          "FADE TO BLACK." is an archaic phrase; it’s better to use FADE OUT.
          instead.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “FADE TO BLACK”:-
      </h3>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Formatting Transitions
      </h1>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">Alignment:-</span> Transitions are
          right-aligned, beginning at 6.0 inches from the left edge.{" "}
        </li>
        <li>
          <span className="font-bold">Capitalization:-</span> Always written in
          ALL CAPS.
        </li>
        <li>
          <span className="font-bold">Punctuation:-</span> Transitions ending in
          “TO” (e.g., DISSOLVE TO:) must include a colon. Transitions ending in
          “OUT” (e.g., FADE OUT.) must end with a period.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for “Formatting Transitions”:-
      </h3>
      <WhiteBg>
        <p className="text-end">FADE TO.</p>
        <p className="text-end">DISSOLVE TO.</p>
        <p className="text-end">FADE OUT.</p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        When Not to Use Transitions
      </h1>
      <p className="font-garnetMe">
        Modern screenwriting avoids excessive transitions like CUT TO: since
        editors naturally assume all scenes are connected by cuts unless
        specified otherwise. Including CUT TO: after every scene heading makes
        the script redundant and cluttered.
      </p>
      <h3 className="font-semibold  underline pt-4">Example:-</h3>
      {/* INCCORRECT */}
      <WhiteBg>
        <div className="flex flex-col gap-3">
          <p className="text-start mb-2 font-garnetSemi text-pink-500">Incorrect:</p>
          <p className="text-start leading-loose">
            INT. MUMBAI STREET - NIGHT
            <br />
            Rajan steps onto the road.
          </p>
          <p className="text-end">CUT TO:</p>
          <p className="text-start leading-loose">
            EXT. MUMBAI BRIDGE - NIGHT
            <br />
            The headlights of a car flash through the fog.
          </p>
          <p className="text-start mt-4 mb-2 font-garnetSemi text-primary-blue">
            Correct(Implied cut):
          </p>
          <p className="text-start leading-loose">
            INT. MUMBAI STREET - NIGHT
            <br />
            Rajan steps onto the road.
            <br />
            EXT. MUMBAI BRIDGE - NIGHT
            <br />
            The headlights of a car flash through the fog.
          </p>
        </div>
      </WhiteBg>
      <p>
        <span className="font-bold">Note:- </span>Avoid phrases like SMASH CUT
        or CUT TO BLACK—a cut is a cut. Let the editor and director decide the
        pacing and style.c
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Combining FADE IN and FADE OUT
      </h1>
      <p className="font-garnetMe">
        To simplify formatting, transitions like FADE OUT. and FADE IN: can be
        combined into a single instruction: FADE TO:
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Combining FADE IN and FADE OUT”:-
      </h3>
      <WhiteBg>
        <p className="text-end">FADE OUT.</p>
        <p className="text-start leading-loose">
          INT. OLD THEATRE - NIGHT <br />
          Dust hangs in the beam of a flickering projector light.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Modern vs. Old-Fashioned Transitions
      </h1>
      <p className="font-garnetMe">
        Some old-fashioned transitions like WIPE TO:, IRIS IN:, and IRIS OUT:
        were popular in early cinema but are rarely used today. Reserve them
        only for scripts that require a vintage or stylized effect.
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Modern Transitions”:-
      </h3>
      <WhiteBg>
        <p className="text-end my-2">DISSOLVE TO.</p>
      </WhiteBg>
      <h3 className="font-semibold  underline pt-4">
        Example for “Old-Fashioned Transition Example (Avoid Unless Necessary):-
      </h3>
      <WhiteBg>
        <p className="text-end my-2">WIFE TO.</p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Special Transitions for Indian Screenplays
      </h1>
      <p className="font-garnetMe">
        In Indian cinema, transitions are often used creatively to signify:
      </p>
      <ul className="list-disc  pl-8">
        <li>Musical Sequences: A dissolve or fade to a song sequence.</li>
        <li>
          Dream Sequences: A stylistic dissolve or fade into surreal visuals.
        </li>
        <li>
          Flashbacks: Use DISSOLVE TO: or a transition paired with a time
          reference.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4">
        Example for Flashbacks:-
      </h3>
      <WhiteBg>
        <p className="text-end">DISSOLVE OUT.</p>
        <p className="text-start leading-loose">
          <span className="mb-4 block"> SUPERIMPOSE: “FIVE YEARS EARLIER”</span>
          EXT. RAJAN’S VILLAGE - DAY <br />
          Children laugh and play around a banyan tree.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Transitions at the End of the Script
      </h1>
      <p className="font-garnetMe">
        To conclude a script, always use FADE OUT.
      </p>
      <h3 className="font-semibold  underline pt-4">
        Example for “Transitions at the End of the Script”:-
      </h3>
      <WhiteBg>
        <p className="text-end">FADE OUT.</p>
        <p className="text-center">THE END.</p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Transition Formatting in Screenplay.ink
      </h1>
      <p className="font-garnetMe">
        Screenplay.ink ensures that transitions are:
      </p>
      <ul className="list-disc  pl-8">
        <li>Right-aligned automatically for consistency.</li>
        <li>Formatted with proper spacing and punctuation.</li>
        <li>Integrated seamlessly with scene headings and action lines.</li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Key Do’s and Don’ts
      </h1>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">Do:</h3>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">Use FADE IN:-</span> to open the script
          and FADE OUT. to close it.{" "}
        </li>
        <li>
          <span className="font-bold">Use DISSOLVE TO:- </span>sparingly to
          signify a soft transition or time lapse.
        </li>
        <li>Right-align all transitions for clarity and presentation.</li>
      </ul>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">Don’t:</h3>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">Use CUT TO:-</span> after every scene—cuts
          are implied.{" "}
        </li>
        <li>Overuse transitions; they are meant to guide, not overwhelm.</li>
        <li>
          Use old-fashioned terms like WIPE TO: or IRIS IN: unless required for
          stylistic reasons.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Final Note
      </h1>
      <p className="font-garnetMe">
        Transitions are powerful tools when used sparingly. They guide the
        editor and reader through significant visual or temporal shifts while
        keeping the script clean and professional. Modern screenwriting relies
        more on implied cuts, with transitions reserved for stylistic or
        dramatic emphasis.
      </p>
      <br></br>
      <p className="font-garnetMe">
        With Screenplay.ink, formatting transitions is effortless—alignments,
        spacing, and industry-standard placement are automated, letting you
        focus on telling your story.
      </p>
    </div>
  );
};

export default Transitions;
