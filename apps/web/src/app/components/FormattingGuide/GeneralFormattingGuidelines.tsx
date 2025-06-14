import React from "react";
import { WhiteBg } from "./WhiteBg";
import ImageWrapper from "../ImageWrapper";

const GeneralFormattingGuidelines = () => {
  return (
    <div className="text-black garnet-regular sm:text-base text-sm">
      <h1 className="text-3xl font-garnetSemi font-bold text-[#43479B] py-4 ">
        Screenplay Format Guide
      </h1>
      <h3 className="text-lg font-garnetSemi py-2">Why Formatting Matters</h3>
      <p>
        Formatting is the unsung hero of screenwriting. It ensures that your
        script reads professionally, letting your story, characters, and
        dialogues shine. While storytelling takes center stage, poor formatting
        can quickly overshadow even the most brilliant narrative. A
        well-formatted screenplay makes it easier for readers—whether producers,
        directors, or actors—to envision your story.
        <br /> <br />
        At Screenplay.ink, we make your life easier by ensuring your script
        adheres to global and Indian film industry standards. All you need to do
        is focus on your creative process—our software handles the rest.
      </p>
      <h3 className="font-semibold text-lg font-garnetSemi py-2 pt-4">
        What Screenplay.ink Does
      </h3>
      <ul className="list-disc  pl-8">
        <li>
          Industry-standard formatting for Bollywood, regional cinema, and
          international markets.
        </li>
        <li>
          Automatic scene heading formatting, character cues, and dialogue
          alignment.
        </li>
        <li>
          Support for multiple Indian languages (Hindi, Telugu, Tamil,
          Malayalam, Kannada, and more) with native script and transliteration
          options.
        </li>
        <li>Page settings optimized for A4 paper size—the Indian standard.</li>
      </ul>
      <p className=" pt-4">
        Note: While Screenplay.ink helps you format effortlessly, we do not
        provide manual formatting services. This guide will ensure you
        understand and appreciate professional screenplay formatting
        conventions.
      </p>
      <h1 className="text-2xl font-semibold font-garnetSemi text-[#43479B] py-4 ">
        General Formatting Guidelines
      </h1>
      <h3 className="font-semibold text-lg font-garnetSemi py-2">
        Title Page
      </h3>
      <p>Your title page sets the tone for professionalism. Inc</p>
      <ul className="list-disc  pl-8">
        <li>Script Title: Centered, ALL CAPS, bold. </li>
        <li>“Written by” or “Screenplay by” followed by the writer’s name.</li>
        <li>
          Contact Information: Place at the bottom left of the page (email,
          phone number, etc.).
        </li>
      </ul>
      <h3 className="text-base font-semibold  underline pt-4">
        Example for Title Page:-
      </h3>
      <ul className="list-disc  pl-8 mb-4">
        <li>
          Avoid images, graphics, or fancy fonts. A plain, clean design conveys
          professionalism.
        </li>
      </ul>
      <ImageWrapper
        src={"/assets/formattingguide/generalHero.png"}
        alt="Title Page Example"
        width={600}
        height={400}
        loading={"eager"}
        className="select-none pointer-events-none w-full"
      />
      <h3 className="font-semibold text-lg font-garnetSemi py-2 pt-4">
        Typeface and Page Settings
      </h3>
      <p>Your title page sets the tone for professionalism.</p>
      <ul className="list-disc  pl-8">
        <li>
          Include: Font: Courier 12-point (fixed-pitch). This ensures every
          character takes up the same space.
        </li>
        <li>
          Paper Size: Use A4 (8.27 x 11.69 inches)—the standard for Indian
          scripts.
        </li>
        <li>
          Margins: Top: 1 inch , Bottom: 1 inch, Left: 1.5 inches, Right: 1
          inch.
        </li>
        <li>
          Page Numbers: Start on the first script page (not the title page),
          top-right, aligned with the margin. Example: "Page 2"
        </li>
      </ul>
      <p className=" display:inline">
        <span className="font-semibold text-lg"></span>Screenplay.ink ensures
        precise formatting and pagination automatically, including margins,
        headers, and footers.
      </p>
      <h3 className="text-2xl font-garnetSemi font-semibold text-[#43479B] mt-8 mb-4">
        The Script Elements
      </h3>
      <h3 className="font-semibold text-lg  py-2">FADE IN</h3>
      <p>
        Always begin your script with FADE IN: on the left margin, followed by a
        blank line.
      </p>
      <h3 className="font-semibold text-lg  py-2">
        Scene Headings (Sluglines)
      </h3>
      <p>Scene headings tell the reader:</p>
      <ul className="list-disc  pl-8">
        <li>Location: INT (Interior) or EXT (Exterior)</li>
        <li>Specific Place: e.g., "MUMBAI CAFE" </li>
        <li>Time of Day: e.g., DAY or NIGHT</li>
      </ul>
      <p>Format:ALL CAPS and left-aligned.</p>
      <h3 className="font-semibold  underline pt-4 mb-4">
        Example for Scene Headings:-
      </h3>
      {/* Resuse this bg */}
      <WhiteBg>
        <p className="text-center">INT. MUMBAI CAFE - NIGHT</p>
      </WhiteBg>
      <h3 className="font-semibold text-lg  py-2 pt-2">Action Lines</h3>
      <p>
        Describe what’s happening in the scene. Keep it concise and visual.
        Action lines show, not tell. Avoid over-directing or using camera
        instructions unless absolutely necessary.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-4">
        Example for Action Lines:-
      </h3>
      <WhiteBg>
        <p className="text-center">
          A bare bulb swings, casting eerie shadows across the cafe. RAJ sits
          alone, sipping tea. The distant rumble of a train echoes.{" "}
        </p>
      </WhiteBg>
      <h3 className="font-semibold text-lg  py-2 pt-2">Character Cues</h3>
      <p>Character names appear in ALL CAPS, centered, above the dialogue.</p>
      <h3 className="font-semibold  underline pt-4 mb-4">
        Example for Character Cues:-
      </h3>
      <WhiteBg>
        <p className="text-center my-2">RAJ</p>
      </WhiteBg>
      <h3 className="font-semibold text-lg  py-2 pt-2">Dialogue</h3>
      <ul className="list-disc  pl-8">
        <li>
          Write dialogue beneath the character’s name, indented about 2.5 inches
          from the left ma
        </li>
        <li>Avoid justification; it should be left-aligned.</li>
      </ul>
      <h3 className="font-semibold text-lg  underline pt-4 mb-4">
        Example for Dialogue:-
      </h3>
      <WhiteBg>
        <p className="text-center">RAJ</p>
        <p className="text-center">I'm just saying... sometimes tea</p>
        <p className="text-center">tastes better when you're alone.</p>
      </WhiteBg>
      <h3 className="font-semibold text-lg  py-2 pt-2">Parentheticals</h3>
      <p>
        Parentheticals give short, specific directions for how dialogue is
        delivered. Use them sparingly, and only when necessary for clarity.
      </p>
      <h3 className="font-semibold underline pt-4 mb-4">
        Example for Parentheticals:-
      </h3>
      <WhiteBg>
        <p className="text-center">RAJ</p>
        <p className="text-center">(whispering)</p>
        <p className="text-center">Don't look now.</p>
      </WhiteBg>{" "}
      <h3 className="font-semibold text-lg  py-2 pt-2">Transitions</h3>
      <p>
        Transitions (like CUT TO:, FADE OUT:) appear right-aligned and in ALL
        CAPS. Use them sparingly—mostly at the beginning and end of your script.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-4">
        Example for Transitions:-
      </h3>
      <WhiteBg>
        <p className="text-end my-2">FADE OUT.</p>
      </WhiteBg>
      <h3 className="font-semibold text-lg  py-2 pt-2">End of Script</h3>
      <p>Conclude with:</p>
      <h3 className="font-semibold underline pt-4 mb-4">
        Example for End of Script:-
      </h3>
      <ul className="list-disc  pl-8">
        <li>Centered, ALL CAPS, and underlined.</li>
      </ul>
      <WhiteBg>
        <p className="text-center my-2">THE END</p>
      </WhiteBg>
      <h1 className="text-2xl font-semibold text-[#43479B] py-4 ">
        Formatting Tips for Indian Scripts
      </h1>
      <h3 className="font-semibold text-lg  py-2 pt-2">Regional Dialogues</h3>
      <p>
        For Indian scripts, Screenplay.ink allows you to write dialogue in
        native languages like Hindi or Telugu while retaining English
        transliterations for broader understanding.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-4">
        Example for Regional Dialogues:-
      </h3>
      <WhiteBg>
        <p className="text-center">RAJ</p>
        <p className="text-center">(In Hindi, subtitled)</p>
        <p className="text-center">Chai aur tanhai ka maza hi</p>
        <p className="text-center">kuch aur hai</p>
      </WhiteBg>
      <h3 className="font-semibold text-lg  py-2 pt-2">Song Lyrics</h3>
      <p>
        Songs are a common feature in Indian films. Use structured formatting
        for clarity
      </p>
      <h3 className="font-semibold underline pt-4 mb-4">
        Example for Song Lyrics:-
      </h3>
      <WhiteBg>
        <p className="text-center">SONG SEQUENCE :</p>
        <p className="text-center">(Lyrics)</p>
        <p className="text-center">MAHI VE, MAHI VE,</p>
        <p className="text-center">DIL CHURAA LE RE...</p>
      </WhiteBg>
      <h1 className="font-semibold text-2xl text-[#43479B] py-4 ">
        Spec Scripts vs Shooting Scripts
      </h1>
      <h3 className="font-semibold text-lg  py-2 pt-2">Spec Script</h3>
      <p>
        This is the version submitted to studios. Avoid camera angles,
        CONTINUEDs, or scene numbers. Focus on storytelling.
      </p>
      <h3 className="font-semibold text-lg  py-2 pt-2">Shooting Script</h3>
      <p>
        Used in production and includes scene numbers, camera directions, and
        technical instructions.
      </p>
      <p>
        Screenplay.ink helps you transition from a spec script to a shooting
        script effortlessly with automated tools.
      </p>
      <h1 className="font-semibold text-2xl text-[#43479B] py-4 ">
        Best Practices
      </h1>
      <ul className="list-disc  pl-8">
        <li>
          Keep it Under 120 Pages: A screenplay should ideally be 90–120 pages.
          One page roughly equals one minute of screen time.Proofread before
          submis
        </li>
        <li>
          Avoid Clutter: No images, bold text, or underlining (except for THE
          END).
        </li>
        <li>Spell-Check: Typos create a poor impression.</li>
        <li>
          Page Consistency: Do not cheat margins or reduce font size to compress
          pages.
        </li>
      </ul>
      <h1 className="font-semibold text-2xl text-[#43479B] py-4 ">
        Why Screenplay.ink?
      </h1>
      <p>
        With Screenplay.ink, formatting becomes effortless. Features include:
      </p>
      <ul className="list-disc  pl-8">
        <li>Automatic A4 pagination and industry-standard margins.</li>
        <li>Scene heading and dialogue alignment tools.</li>
        <li> Support for Indian languages and transliteration.</li>
        <li>
          Templates for Bollywood, regional cinema, and international
          submissions.
        </li>
      </ul>
      <h1 className="font-semibold text-2xl text-[#43479B] py-4 ">
        Final Note
      </h1>
      <p>
        The best screenplays adhere to proper formatting because readers respect
        writers who respect the craft. Screenplay.ink takes care of formatting
        so you can focus on storytelling.
      </p>
      <br></br>
      <p>Start Writing Your Masterpiece Now!</p>
    </div>
  );
};

export default GeneralFormattingGuidelines;
