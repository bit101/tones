tones
=====

The Web Audio API is pretty amazing. You can actually synthesize audio with JavaScript right in the browser. The only problem is that it's pretty low level and not exactly intuitive to work with. This library is meant to make it as simple as humanly possible to create pleasant sounding musical tones.

See a few demos of tones in action here:

http://bit101.github.io/tones/

The tones api is drop dead simple. One main method: `play`.

The play method can be used in a few different ways:

1. Play a tone at a specific frequency.
2. Play a named note in the default 4th octave.
3. Play a named note in a specific octave.
 
Examples:

	tones.play(440);		// plays a 440 hz tone
	tones.play("c");		// plays a C note in the 4th octave.
	tones.play("c#");		// plays a C sharp note in the 4th octave.
	tones.play("eb");		// plays an E flat note in the 4th octave.
	tones.play("c", 2);		// plays a C note in the 2nd octave.
	
Named notes are case insensitive. "c" is the same as "C".

There are also a few properties that affect the sound of the tone played. Set these before playing a tone and they will affect all future tones played.

	type		// this is the wave form, a string of one of the following: "sine", "square", "sawtooth" or "triangle"
	attack 		// sets the attack of the envelope, or the time that the sound takes to reach full volume.
	release		// sets the release of the envelope, or the time it takes for the sound to fade out.

Attack and release are numbers which should generally be in the range of around 1 to 300. A low release, and mid-range release will give a bell sound. A long attack and release will sound more like a flute. Combined with different wave form types, this allows you to create all kinds of unique sounds.

Note that attack and release values do not represent discrete times. But roughly speaking your sound will last about 10 times the total of these two in milliseconds. For example, an attack of 100 and release of 200 totals 300, so the tone will last around 3000 milliseconds or 3 seconds before completely fading out.

There is also a `getTimeMS` function. This returns the current time reported by the audio context, which keeps a very accurate internal timer. Some of the examples use this to set up a sort of sequencer.

There's a whole lot more that could be done to this, and I'll probably add features to this, while trying to make sure that the core functionality remains as simple as possible.

It goes without saying that this library will only work in browsers that support the Web Audio API, which includes Chrome, Firefox and Safari (I think), but not Internet Explorer.
