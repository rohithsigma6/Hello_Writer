import React from "react";
import { WhiteBg } from "./WhiteBg";

const SceneHeadings = () => {
  return (
    <div className="text-black garnet-regular sm:text-base text-sm">
      <h1 className="text-3xl font-extrabold font-garnetSemi text-[#43479B] py-4 ">
        Script Format: Scene Headings
      </h1>
      <p>
        A scene heading (also known as a slugline) is a fundamental component of
        screenplay formatting. It tells the reader where and when the scene is
        happening. It provides clarity for production teams, directors, and
        cinematographers to envision and plan the setting.
      </p>
      <br></br>
      <p>
        At Screenplay.ink, scene headings are automatically formatted as per
        industry standards for Bollywood, regional Indian cinema, and
        international submissions. Still, understanding their structure ensures
        you master the art of professional screenwriting.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        What is a Scene Heading?
      </h1>
      <p>A scene heading always includes at least two key elements: </p>
      <ul className="list-disc  pl-8">
        <li>
          An indicator of the location: INT. (Interior) or EXT. (Exterior).
        </li>
        <li>
          The setting/location: A specific place where the scene takes place.
        </li>
      </ul>
      <br></br>
      <p>It can also include a third optional element:</p>
      <ul className="list-disc  pl-8">
        <li>
          The time of day: Such as DAY, NIGHT, or modifiers like LATER, DAWN,
          DUSK.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Scene Heading:-
      </h3>
      <WhiteBg>
        <p className="text-start my-2">INT. MUMBAI CAFE - NIGHT</p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Structure of a Scene Heading
      </h1>
      <h1 className="text-xl font-bold font-garnetSemi py-4 ">INT. or EXT.</h1>
      <ul className="list-disc  pl-8">
        <li>
          Use INT. for Interior scenes (e.g., inside a house, car, room).{" "}
        </li>
        <li>Use EXT. for Exterior scenes (e.g., streets, gardens, markets).</li>
        <li>
          For continuous movement between interior and exterior, use INT./EXT.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for INT. or EXT.:-
      </h3>
      <WhiteBg>
        <p className="text-start my-2">INT. /EXT. MOVING TRAIN - DAY</p>
      </WhiteBg>
      <p>
        <span className="font-bold mt-4">Note:</span> INT. and EXT. are
        abbreviations and must always be written in ALL CAPS and end with a
        period.
      </p>
      <h1 className="text-xl font-bold font-garnetSemi  py-4 ">The Location</h1>
      <p>
        The location describes where the scene takes place. Keep it concise but
        specific. If the location includes sub-settings (e.g., a room inside a
        house), separate them with a slash or hyphen.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for The Location:-
      </h3>
      <WhiteBg>
        <p className="text-start">
          EXT. OLD DELHI MARKET - DAY <br />
          INT. RAJAN’S APARTMENT/KITCHEN - NIGHT
          <br />
          INT. SCHOOL CLASSROOM - MORNING
        </p>
      </WhiteBg>
      <p>
        <span className="font-bold mt-4">Pro Tip: </span> Always include the
        master setting first. Avoid vague or incomplete locations like “MORTY’S
        BEDROOM.” Instead, write “MORTY’S HOUSE/BEDROOM.”
      </p>
      <h1 className="text-xl font-bold font-garnetSemi  py-4 ">
        The Time of Day
      </h1>
      <p>
        The time of day helps orient readers and production teams. Common
        modifiers include:{" "}
      </p>
      <ul className="list-disc  pl-8">
        <li> DAY </li>
        <li> NIGHT</li>
        <li>LATER:Used when the same setting occurs later in time. </li>
        <li>DAWN or DUSK: Indicates early morning or twilight.</li>
      </ul>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for The Time of Day :-
      </h3>
      <WhiteBg>
        <p className="text-start">
          INT. TRAIN STATION PLATFORM - DAWN
          <br />
          EXT. MUMBAI CAFE - DAY (LATER)
        </p>
      </WhiteBg>
      <p>
        <span className="font-bold mt-4">Pro Tip:</span> Avoid using redundant
        terms like “CONTINUOUS” unless necessary in multi-camera television
        production.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Scene Headings for Specific Settings
      </h1>
      <h1 className="text-xl font-bold font-garnetSemi  py-4 ">Vehicles</h1>
      <p>
        If a scene takes place in a moving vehicle, use TRAVELING or MOVING to
        describe its motion.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Vehicles.:-
      </h3>
      <WhiteBg>
        <p className="text-start">
          INT. RENTAL CAR - DAY - TRAVELING
          <br />
          EXT. BOAT - NIGHT - MOVING
        </p>
      </WhiteBg>
      <h1 className="text-xl font-bold font-garnetSemi  py-4 ">
        Cities and Countries
      </h1>
      <p>
        When specifying a city, country, or notable locale, include it in
        parentheses to avoid confusion.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Cities and Countries:-
      </h3>
      <WhiteBg>
        <p className="text-start">
          EXT. MARKET STREET (ROME) - DAY
          <br />
          INT. TIMES SQUARE (1929) - NIGHT
        </p>
      </WhiteBg>
      <h1 className="text-xl font-bold font-garnetSemi  py-4 ">
        Unique Locations with Names
      </h1>
      <p>
        If the location has a proper name (e.g., a restaurant, building, or
        ship), enclose the name in quotes.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Unique Locations with Names:-
      </h3>
      <WhiteBg>
        <p className="text-start my-2">
          INT. "THE ROYAL COURT" HOTEL LOBBY - DAY
        </p>
      </WhiteBg>
      <h1 className="text-xl font-bold font-garnetSemi  py-4 ">
        Stock Footage
      </h1>
      <p>
        When using stock footage, indicate it with a dash followed by the word
        “STOCK” in parentheses.
      </p>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Stock Footage :-
      </h3>
      <WhiteBg>
        <p className="text-start my-2">
          EXT. HIMALAYAN MOUNTAINS - DAY (STOCK)
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Master Settings and Sub-Settings
      </h1>
      <p>
        A master setting refers to the main location, while sub-settings
        describe specific parts of it. Use a slash to connect them for clarity.
      </p>
      <WhiteBg>
        <p className="text-start my-2">INT. APARTMENT/LIVING ROOM - DAY</p>
      </WhiteBg>
      <p>
        If the camera moves from one room to another within the same setting,
        the new heading does not need to repeat the master setting:
      </p>
      <WhiteBg>
        <p className="text-start my-2">INT. KITCHEN</p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Scene Transitions
      </h1>
      <p>
        When the action moves between interior and exterior (or vice versa)
        within the same shot, use INT./EXT.
      </p>
      <WhiteBg>
        <p className="text-start my-2">
          INT./EXT. EDWARDIAN HOTEL - DAY - TRACKING
        </p>
      </WhiteBg>
      <p>The term “TRACKING” indicates a moving camera shot.</p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Formatting Scene Headings with Screenplay.ink
      </h1>
      <ul className="list-disc  pl-8">
        <li>Scene headings are written in ALL CAPS.</li>
        <li>
          Avoid bold, italics, or underlining for scene headings. Stick to
          standard formatting.
        </li>
        <li>
          Add two blank lines (triple-space) before each scene heading to
          separate it visually.
        </li>
      </ul>
      <h3 className="font-semibold  underline pt-4 mb-2">
        Example for Formatting Scene Headings with Screenplay.ink:-
      </h3>
      <WhiteBg>
        <p className="text-start">
          INT. MUMBAI STREET - NIGHT.
          <br />
          <br />
          Banners sway in the warm breeze. Shopkeepers shut their stalls as
          streetlights flicker to life.
        </p>
      </WhiteBg>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Common Scene Heading Mistakes to Avoid
      </h1>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold">Vague Locations:-</span> Be specific.
          Don’t write “HOUSE” when you mean “RAJAN’S HOUSE/KITCHEN.”
        </li>
        <li>
          <span className="font-bold">Incorrect Time Modifiers:-</span> Use DAY,
          NIGHT, or accepted terms like LATER, DAWN, and DUSK. Avoid
          “CONTINUOUS” unless writing for multi-camera productions.
        </li>
        <li>
          <span className="font-bold">Unnecessary Scene Numbers:-</span>{" "}
          Numbering scenes is only for shooting scripts. Avoid numbering in spec
          scripts.
        </li>
      </ul>
      <br></br>
      <p>
        Proper margins are the foundation of a clean, professional screenplay.
        At Screenplay.ink, we ensure you follow these standards effortlessly.
      </p>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4 ">
        Why Scene Headings Matter
      </h1>
      <p>
        Scene headings help the reader visualize the flow of your story.
        Directors, production managers, and cinematographers rely on them for
        planning schedules, locations, and equipment.
      </p>
      <br></br>
      <p>
        With Screenplay.ink, formatting scene headings is automatic, ensuring:
      </p>
      <ul className="list-disc  pl-8">
        <li>
          <span className="font-bold"> Precision:-</span> Accurate alignment and
          spacing.
        </li>
        <li>
          <span className="font-bold">Efficiency:-</span>Quick input with
          shortcuts for INT./EXT., times of day, and sub-settings.
        </li>
        <li>
          <span className="font-bold">Language Support:-</span>Scene headings in
          regional Indian scripts, with transliteration options.
        </li>
      </ul>
      <h1 className="text-2xl font-bold font-garnetSemi text-[#43479B] py-4  mt-2">
        Final Note
      </h1>
      <p>
        Scene headings are the blueprint for your story’s locations. Whether
        you're writing for Bollywood, Tollywood, or global cinema, proper
        headings show your professionalism and respect for the craft.
      </p>
      <br></br>
      <p>
        Screenplay.ink takes care of the formatting so you can focus on writing
        exceptional scenes.
      </p>
    </div>
  );
};

export default SceneHeadings;
