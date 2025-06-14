import React from "react";
import { WhiteBg } from "./WhiteBg";

const MarginSettings = () => {
  return (
    <div className="text-black garnet-regular sm:text-base text-sm">
      <h1 className="text-3xl font-garnetSemi font-extrabold text-[#43479B] py-4 ">
        Script Format: Margin Settings
      </h1>
      <p>
        Screenplay formatting is about precision. Margins play a vital role in
        ensuring your screenplay has a clean, professional layout that meets
        industry standards. Proper margins allow readers—producers, directors,
        actors—to follow the script effortlessly and ensure the correct
        page-to-minute ratio (one page roughly equals one minute of screen
        time).
      </p>
      <br></br>
      <p>
        With Screenplay.ink, these margin settings are automated, so you don’t
        need to worry about fine-tuning these values. However, understanding the
        layout ensures you appreciate how each element fits into the page.
      </p>
      <h1 className="text-2xl font-garnetSemi font-bold text-[#43479B] py-4 ">
        Why Margins Matter
      </h1>
      <p>
        Margins are more than just white spaces. They separate different
        elements (action, character names, dialogue) clearly so readers can scan
        a page quickly. Correct margin settings also ensure that:
      </p>
      <ul className="list-disc  pl-8">
        <li>
          Timing: Every page translates to approximately one minute of screen
          time.
        </li>
        <li>
          Readability: Elements like dialogue and action are well-defined and
          easy to follow.
        </li>
        <li>
          Professionalism: Proper formatting ensures your screenplay looks
          polished.
        </li>
      </ul>
      <h1 className="text-2xl font-garnetSemi font-bold text-[#43479B] py-4 ">
        Breakdown of Margin Settings
      </h1>
      <h1 className="text-lg font-bold font-garnetSemi py-4 ">Action Lines</h1>
      <p>
        Action lines describe what the audience sees and hears. These are
        aligned to the left margin, 1.5 inches from the edge, extending to 1
        inch from the right margin. This leaves about 6 inches of width for
        action text.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Action Lines:-
      </h3>
      <WhiteBg>
        <p className="text-start">
          A long train pulls into a dusty station. Passengers pour out,
          scrambling for cool air.
          <br />
          <br />
          RAJ steps down, suitcase in hand, scanning the crowd.
        </p>
      </WhiteBg>
      <h1 className="text-lg font-bold font-garnetSemi py-4 ">
        Character Cues
      </h1>
      <p>
        Character names appear centered above dialogue in ALL CAPS. The left
        margin for character cues is 4.2 inches, with a width of 3.3 inches.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Character Cues:-
      </h3>
      <WhiteBg>
        <p className="text-center my-2">RAJ</p>
      </WhiteBg>
      <h1 className="text-lg font-bold font-garnetSemi py-4 ">Dialogue</h1>
      <p>
        Dialogue appears directly beneath the character cue, indented with a
        left margin of 2.9 inches and a right margin of 2.3 inches, leaving a
        width of 3.3 inches. This ensures dialogue remains visually distinct and
        easy to read.
      </p>
      <h3 className="font-semibold underline pt-4 mb-2">
        Example for Dialogue:-
      </h3>
      <WhiteBg>
        <p className="text-center">RAJ</p>
        <p className="text-center">This is where it all began.</p>
        <p className="text-center">Nothing's been the same since.</p>
      </WhiteBg>
      <h1 className="text-lg font-bold font-garnetSemi py-4 ">
        Parentheticals
      </h1>
      <p>
        Parentheticals (directions like tone or delivery cues) appear between
        the character cue and dialogue. Indented with a left margin of 3.6
        inches and a right margin of 2.9 inches, the width is 2 inches.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Parentheticals:-
      </h3>
      <WhiteBg>
        <p className="text-center">RAJ</p>
        <p className="text-center">(whispering)</p>
        <p className="text-center">Stay quiet. They might hear us.</p>
      </WhiteBg>
      <h1 className="text-lg font-bold font-garnetSemi py-4 ">Transitions</h1>
      <p>
        Transitions like CUT TO: or FADE OUT: are right-aligned and appear at
        the far right margin. The left margin starts at 6 inches, leaving a
        width of 1.5 inches. Transitions are written in ALL CAPS.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example of Transitions:-
      </h3>
      <WhiteBg>
        <p className="text-end my-2">CUT TO.</p>
      </WhiteBg>
      <h1 className="text-2xl font-garnetSemi font-bold text-[#43479B] py-4 ">
        Standard Screenplay Margins
      </h1>
      <p>
        The table below summarizes the industry-standard margin settings for
        screenplay elements. Measurements are in inches (for clarity on an A4
        page in the Indian market).
      </p>
      {/* <img className='w-[65%]' src={MarginalSettingsImages6} alt='MarginalSettingsImages6' /> */}
      <h1 className="text-lg font-bold font-garnetSemi py-4 ">
        What Each Margin Means
      </h1>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold  ml-2"> Left Margin:</span>Distance from
          the left edge of the page.
        </li>
        <li>
          <span className="font-bold  ml-2"> Left Margin:</span>Right Margin:
          Distance from the right edge of the page.
        </li>
        <li>
          <span className="font-bold  ml-2"> Left Margin:</span>Width: Total
          space an element occupies horizontally.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Visual Margin Layout
      </h1>
      <p className="garnetMed">
        Here is how the margins work together on a single script page:
      </p>
      <WhiteBg>
        <div className="w-full mb-4 flex flex-row justify-between">
          <p>1.5 inches (Left Margin)</p>
          <p>6 inches width</p>
          <p>1 inches (Right Margin)</p>
        </div>
        <p className="text-start mb-4">INT. MUMBAI CAFE - NIGHT</p>
        <p className="text-start mb-4">
          A small, cozy tea shop glimmers under the orange streetlights. The
          clink of glasses echoes as tea is poured.
        </p>
        <p className="text-center">RAJ</p>
        <p className="text-center">(smiling softly)</p>
        <p className="text-center">I never thought I'd come back here.</p>
        <p className="text-end">FADE OUT.</p>
      </WhiteBg>
      {/* <img className='w-100' src={MarginalSettingsImages7} alt='MarginalSettingsImages7' /> */}
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Screenplay.ink: Automated Margins
      </h1>
      <p className="garnetMed">
        Screenplay.ink automatically applies these margin settings while you
        write. Features include:
      </p>
      <ul className="list-disc  pl-8">
        <li>Industry-standard margins for Indian and international scripts.</li>
        <li>
          Automatic alignment of character cues, dialogues, transitions, and
          parentheticals.
        </li>
        <li> A4 compatibility to match Indian printing standards.</li>
      </ul>
      <br></br>
      <p className="garnetMed">
        With Screenplay.ink, you never have to worry about tweaking margins
        manually—our platform ensures your script looks polished and
        professional right out of the box.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Final Note
      </h1>
      <ul className="list-disc  pl-8">
        <li>
          Don’t cheat margins to fit more words on a page; it compromises
          readability.
        </li>
        <li>
          Margins aren’t a restriction; they create a flow that makes reading
          effortless.
        </li>
        <li>
          Consistent formatting shows respect for the reader and the craft.
        </li>
      </ul>
      <br></br>
      <p className="garnetMed">
        Proper margins are the foundation of a clean, professional screenplay.
        At Screenplay.ink, we ensure you follow these standards effortlessly.
      </p>
    </div>
  );
};

export default MarginSettings;
