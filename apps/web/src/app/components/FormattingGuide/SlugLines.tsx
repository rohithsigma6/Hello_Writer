import React from "react";
import { WhiteBg } from "./WhiteBg";

const SlugLines = () => {
  return (
    <div className="text-black garnet-regular sm:text-base text-sm">
      <h1 className="text-3xl font-extrabold font-garnetSemi text-[#43479B] py-4 ">
        Script Format: Slug Lines
      </h1>
      <p>
        A slug line (also known as a mini-slug) is a line of text that draws
        attention to something important within a scene. Unlike scene headings,
        slug lines are used to shift focus, highlight specific moments, or
        introduce a significant detail. Slug lines help guide the reader’s
        attention and maintain the pacing of a screenplay.
      </p>
      <br></br>
      <p>
        At Screenplay.ink, formatting slug lines is seamless. While
        understanding their usage is key, our software ensures your slug lines
        align with global and Indian industry standards.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        What is a Slug Line?
      </h1>
      <ul className="list-disc  pl-8">
        <li>Written in ALL CAPS.</li>
        <li>
          Brief and punchy, used to highlight a particular moment, character, or
          detail.
        </li>
        <li>
          They do not change the location or time of day (unlike a scene
          heading).
        </li>
        <li>
          Each slug line stands alone and is followed by a new paragraph for
          action or description.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Slug Line:-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          RAJAN
          <br />
          Stares blankly at the ticking clock.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        When to Use Slug Lines
      </h1>
      <p className="garnetMed">Slug lines are ideal for:</p>
      <ul className="list-disc  pl-8">
        <li>
          Refocusing Attention: When the focus shifts to a character, object, or
          action within the same scene.
        </li>
        <li>Point-of-View Shots: Indicating what a specific character sees.</li>
        <li>
          Inserts: Highlighting detail shots, like newspaper headlines or
          screens.
        </li>
        <li>
          Transitions in the Same Location: Emphasizing specific actions or
          events without creating a new scene heading.
        </li>
      </ul>
      <h1 className="text-lg font-bold  font-garnetSemi py-4">
        Shifting Focus
      </h1>
      <p className="garnetMed">
        When you want to draw attention to a specific character or element
        within the scene, use a slug line instead of writing a camera direction.
        Avoid writing unnecessary terms like “ANGLE ON” or “CLOSE-UP”—let the
        slug line do the work.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Shifting Focus:-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          RAJAN
          <br />
          fingers the torn edge of the letter, lost in thought.
        </p>
      </WhiteBg>
      <h1 className="text-lg font-bold  font-garnetSemi py-4">
        Point-of-View (P.O.V.) Shots
      </h1>
      <p className="garnetMed">
        When a scene transitions into a character’s point of view, use a slug
        line to describe what the character sees.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">Format:- </h3>
      <ul className="list-disc  pl-8">
        <li>
          Write the character’s name in ALL CAPS, followed by P.O.V.
          (abbreviated with periods).
        </li>
        <li>Include a dash and describe what is seen.</li>
      </ul>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Point-of-View (P.O.V.) Shots:-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          RAJAN's P.O.V - THE CLOCK
          <br />
          The hands move slower… slower… until they stop.
          <br />
          BACK TO SCENE
          <br />
          Rajan jolts upright, breathing heavily.
        </p>
      </WhiteBg>
      <ul className="list-disc  pl-8">
        <li>
          Follow up the point-of-view shot with “BACK TO SCENE” to return the
          reader’s focus to the main action.
        </li>
      </ul>
      <p className="garnetMed">
        If the entire scene is shot from a character’s perspective, append
        SUBJECTIVE CAMERA to the scene heading.
      </p>
      <WhiteBg>
        <p className="text-start my-2">
          INT. LIVING ROOM - NIGHT - SUBJECTIVE CAMERA
        </p>
      </WhiteBg>
      <h1 className="text-lg font-bold  font-garnetSemi py-4">Inserts</h1>
      <p className="garnetMed">
        An insert is a shot that highlights a detail (e.g., a newspaper
        headline, phone screen, or document) without recognizable characters.
        Use slug lines in ALL CAPS to introduce the insert and include a clear
        description.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Inserts:-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          INSERT - RAJAN’S PHONE SCREEN
          <br />
          A message pops up: **“MEET ME AT THE BRIDGE. MIDNIGHT.”**
          <br />
          BACK TO SCENE
          <br />
          Rajan’s grip tightens on the phone as he glances around nervously.
        </p>
      </WhiteBg>
      <h1 className="text-lg font-bold  font-garnetSemi py-4">
        Split Screens and Special Shots
      </h1>
      <p className="garnetMed">
        Slug lines can also be used for split screens, camera views (through
        binoculars, telescopes, etc.), and overlays. These are often added
        during post-production but can be indicated in the script.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Split Screens and Special Shots :-
      </h3>
      <WhiteBg>
        <p className="text-start leading-loose">
          RAJAN’S P.O.V. - THROUGH THE BINOCULARS
          <br />
          A dark figure emerges from the fog, walking toward the bridge.
          <br />
          BACK TO SCENE
        </p>
      </WhiteBg>
      <p className="garnetMed">
        When processed through special effects (like a matte shot), specify it:
      </p>
      <WhiteBg>
        <p className="text-start my-2">
          RAJAN’S P.O.V. - LIMOUSINE - SCOPE MATTE
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Formatting Slug Lines
      </h1>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">ALL CAPS:- </span>Slug lines are always
          written in ALL CAPS.{" "}
        </li>
        <li>
          <span className="font-bold">
            No Action or Description on the Same Line:-
          </span>{" "}
          A slug line must stand alone. Action or description follows it in a
          new paragraph.
        </li>
        <li>
          <span className="font-bold">Single Blank Line:-</span> Unlike scene
          headings (which have two blank lines before), slug lines are separated
          by a single blank line.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Common Scene Heading Mistakes to Avoid
      </h1>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">Excessive Use:-</span>
          Overusing slug lines can make the script feel fragmented or distract
          from the story. Use them sparingly for focus and pacing.
        </li>
        <li>
          <span className="font-bold">Unnecessary Camera Angles:- </span>
          Avoid writing “CLOSE-UP” or “ANGLE ON” when a simple slug line
          suffices.
        </li>
        <li>
          <span className="font-bold">Changing Locations:- </span>
          Do not use slug lines to change time or location. Use a proper scene
          heading instead{" "}
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Why Slug Lines Matter
      </h1>
      <p className="garnetMed">
        Slug lines keep the screenplay clear and visually dynamic without
        overwhelming the reader with technical directions. They are invaluable
        for pacing and guiding attention to key moments.
      </p>
      <h3 className="font-bold mt-4">At Screenplay.ink, our platform:</h3>
      <ul className="list-disc  pl-8">
        <li>Automatically formats slug lines for clarity.</li>
        <li>Ensures proper alignment and spacing.</li>
        <li>
          Allows you to shift focus efficiently without breaking the flow of
          your story.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Final Note
      </h1>
      <p>
        Slug lines are a powerful tool when used correctly. Whether you’re
        emphasizing a tense moment in a thriller, an insert in a courtroom
        drama, or a character’s perspective in an emotional scene, slug lines
        add punch and clarity to your screenplay.
        <br />
        <br /> With Screenplay.ink, you don’t have to worry about formatting—we
        handle it so you can focus on storytelling.
      </p>
    </div>
  );
};

export default SlugLines;
