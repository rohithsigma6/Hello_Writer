import React from "react";
import { WhiteBg } from "./WhiteBg";

const Dialogue = () => {
  return (
    <div className="text-black garnet-regular sm:text-base text-sm">
      <h1 className="text-3xl font-extrabold font-garnetSemi text-[#43479B] py-4 ">
        Script Format: Dialogue
      </h1>
      <p>
        Dialogue is the heart of a screenplay. It reveals character, drives the
        story forward, and creates emotional resonance. Every word a character
        speaks should serve a purpose—whether it's advancing the plot, revealing
        their personality, or building subtext. Dialogue that feels natural,
        engaging, and culturally relevant connects the audience to your story
        and characters.
      </p>
      <br></br>
      <p>
        {" "}
        At Screenplay.ink, formatting dialogue is effortless and precise. With
        industry-standard alignment, spacing, and handling of multilingual
        scripts, the platform ensures your dialogue flows seamlessly on the
        page.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        What is Dialogue?{" "}
      </h1>
      <p>
        Dialogue refers to the spoken words exchanged between characters in a
        screenplay. It appears directly beneath the character cue and is
        formatted with:
      </p>
      <ul className="list-disc  pl-8">
        <li>2.9 inches from the left margin for alignment.</li>
        <li> Consistent width for readability (around 3.3 inches).</li>
        <li>Single spacing between lines of dialogue.</li>
      </ul>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for “Dialogue”:-
      </h3>
      <WhiteBg>
        <p className="text-center">
          RAJAN <br />
          I'll be back before midnight. Keep the lights on.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold py-4 ">
        Key Principles for Writing Dialogue
      </h1>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Purposeful and Subtextual
      </h3>
      <ul className="list-disc  pl-8">
        <li>
          Avoid "on-the-nose" dialogue:- Lines that state exactly what the
          character is feeling or thinking. Instead, use subtext to hint at
          emotions or thoughts.
        </li>
        <li>
          Dialogue should move the story forward, reveal character dynamics, or
          provide critical information.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example of on-the-nose dialogue (bad):-
      </h3>
      <WhiteBg>
        <p className="text-center">
          MEERA <br />
          I'm scared. I don't want to lose you.
        </p>
      </WhiteBg>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Improved with subtext::-
      </h3>
      <WhiteBg>
        <p className="text-center">
          MEERA <br />
          Just... come back in one piece, okay?
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Avoid Centering Dialogue
      </h3>
      <p>
        Each line of dialogue starts at the 2.9-inch mark from the left margin.
        Centering dialogue disrupts readability and goes against industry
        standards.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Correct Formatting:-
      </h3>
      <WhiteBg>
        <p className="text-center">
          RAJAN <br />
          Something's not tight about this place.
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Breaking Dialogue Across Pages
      </h3>
      <p>
        If a character’s speech runs over to the next page, follow this
        convention:{" "}
      </p>
      <ul className="list-disc  pl-8">
        <li>
          Add “(MORE)” at the bottom of the current page, centered beneath the
          character cue.
        </li>
        <li>
          On the next page, repeat the character cue with “(cont’d)” (short for
          continued) on the same line as the name.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for “Breaking Dialogue Across Pages”:-
      </h3>
      <WhiteBg>
        <p className="text-center">
          FRANK <br />
          I wouldn't go poking round there if I were you. <br />
          (MORE)
          <br />
          --- <br />
          FRANK (cont'd) <br />
          The roof's liable to cave in. I wodn't want that to happen on my
          watch.
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Numbers and Titles in Dialogue
      </h3>
      <ul className="list-disc  pl-8">
        <li>
          Spell out numbers in dialogue to preserve natural flow. Example: “I’ll
          meet you in twenty minutes.”{" "}
        </li>
        <li>
          Use commas for epithets or titles when addressing someone. Example:
          “Master Rajan, your ride is here.”
        </li>
      </ul>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Reciting Text, Songs, or Poetry
      </h3>
      <p>
        If a character is reading aloud from a letter, newspaper, or book,
        indicate this using personal direction (reading) before the dialogue.
        Enclose the text being read in quotes.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">Example :-</h3>
      <WhiteBg>
        <p className="text-center">
          MEERA <br />
          (reading) <br />
          "Meet me at the bridge. Midnight."
        </p>
      </WhiteBg>
      <h3 className="font-semibold  underline pt-4 mb-2">Example :-</h3>
      <ul className="list-disc  pl-8">
        <li>
          For poems or song lyrics, write the lines in quotes and use a slash (
          / ) to indicate line breaks:
        </li>
      </ul>
      <WhiteBg>
        <p className="text-center">
          SINGER <br />
          "Saathi re, saathi re / <br />
          Mujhko zara sa jeene de..."
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Interruptions in Dialogue
      </h3>
      <p>When one character interrupts another: </p>
      <ul className="list-disc  pl-8">
        <li>End the interrupted dialogue with an M-dash (—).</li>
        <li>
          Start the second character’s dialogue immediately on the next line
          without an ellipsis.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4 mb-2">Example :-</h3>
      <WhiteBg>
        <p className="text-center mb-4">
          RAJAN <br />I told you to stay-
        </p>
        <p className="text-center">
          MEERA <br />I heard you, Rajan! But you don't get it!
        </p>
      </WhiteBg>
      <h3 className="font-semibold  underline pt-4 mb-2">Example :-</h3>
      <ul className="list-disc  pl-8">
        <li>
          If a character trails off instead of being interrupted, use an
          ellipsis (...).
        </li>
      </ul>
      <WhiteBg>
        <p className="text-center">
          RAJAN <br />
          I'll thought... you were gone.
        </p>
      </WhiteBg>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">
        Simultaneous Dialogue / Dual Dialogue
      </h3>
      <p>
        When two characters speak at the same time, their lines are written side
        by side in two columns. The left margin for the first column is indented
        slightly to distinguish it.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for “Simultaneous Dialogue”:-
      </h3>
      {/* To edit */}
      <WhiteBg>
        <div className="flex flex-row justify-evenly">
          <p className="text-end">
            RAJAN <br />
            Watch out!
          </p>
          <p className="text-start">
            MEERA <br />
            Watch out!
          </p>
        </div>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Foreign Language Dialogue
      </h1>
      <p>
        When a character speaks in a language other than the primary language of
        the script, follow this format:{" "}
      </p>
      <ul className="list-disc  pl-8">
        <li>Enclose the dialogue in square brackets [ ].</li>
        <li>
          Use a note in parentheses to indicate that the lines will be
          translated as subtitles.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4 mb-2">Example:-</h3>
      <WhiteBg>
        <p className="text-center leading-loose">
          RAJAN <br />
          [Romero, why are you hiding like a child?!] <br />
          (All instances of Hindi will appear in subtitles.)
        </p>
      </WhiteBg>
      <h3 className="font-semibold  underline pt-4 mb-2">Example:-</h3>
      <ul className="list-disc  pl-8">
        <li>
          If the foreign language only appears briefly, you can use personal
          direction instead:
        </li>
      </ul>
      <WhiteBg>
        <p className="text-center leading-loose">
          RAJAN <br />
          (IN hINDI) <br />
          Tum kahan jaa rahe ho?
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Do's and Don'ts for Dialogue
      </h1>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">Do:</h3>
      <ul className="list-disc  pl-8">
        <li>
          Keep dialogue natural and in line with the character’s background,
          education, and personality.
        </li>
        <li>Use slang and colloquialisms where appropriate for realism.</li>
        <li>
          Use subtext to create tension—what’s left unsaid is often as important
          as what’s said.
        </li>
      </ul>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">Don’t:</h3>
      <ul className="list-disc  pl-8">
        <li>
          Don’t write dialogue that sounds like a speech or lecture unless the
          character requires it (e.g., a politician).
        </li>
        <li>
          Avoid ALL CAPS, bold, or italics in dialogue. Use underscoring only to
          emphasize key words sparingly.
        </li>
        <li>
          Don’t write "on-the-nose" dialogue where characters state their
          thoughts or feelings explicitly.
        </li>
      </ul>
      <h3 className="text-lg font-garnetSemi font-bold  py-2">Onscreen Text</h3>
      <p>
        If text appears onscreen (e.g., newspaper headlines, signs), use quotes
        and write in ALL CAPS. Precede it with the term SUPERIMPOSE (all caps,
        followed by a colon).
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for “Onscreen Text”:-
      </h3>
      <WhiteBg>
        <p className="text-center my-2">SUPERIMPOSE: "MUMBAI, 1947"</p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Dialogue Formatting in Screenplay.ink{" "}
      </h1>
      <p>Screenplay.ink simplifies dialogue formatting:</p>
      <ul className="list-disc  pl-8">
        <li>
          Dialogue aligns automatically at 2.9 inches from the left margin.
        </li>
        <li>
          Breaking dialogue across pages inserts (MORE) and (cont’d)
          automatically.
        </li>
        <li>
          Tools for multilingual dialogues, transliterations, and subtitling
          ensure scripts reflect India’s linguistic diversity.
        </li>
        <li>
          {" "}
          Special features handle songs, poems, and simultaneous dialogues
          seamlessly.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Final Note
      </h1>
      <p>
        Great dialogue feels effortless but carries immense weight. Whether
        you're writing sharp, witty banter for a Bollywood rom-com or intense,
        layered lines for a gripping Tollywood thriller, dialogue must always
        serve the story, reveal character, and sound authentic.
      </p>
      <br></br>
      <p>
        With Screenplay.ink, formatting dialogue to professional standards is
        automated, allowing you to focus on making every word count.
      </p>
    </div>
  );
};

export default Dialogue;
