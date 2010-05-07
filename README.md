# Introduction

For the One-Hundreth anniversary of the Boy Scouts of America, four historic
Merit Badges were reactivated. One of these is
[Signaling](http://www.scouting.org/sitecore/content/Home/BoyScouts/AdvancementandAwards/MeritBadges/2010_mb_signaling.aspx).
In order to help the members of my brother’s Boy Scout Troop, I wrote this
application to assist in learning semaphore signals. It can also be used by a
counselor as a prompter for proficiency tests.

# Using It

Open the `semaphore.html` file in your web browser.

Most of the controls are self-explanatory, but a few things need clarification.

* The “Space Duration” is the duration of the space sent between duplicate
letters. The space between words is the same length as a letter. When this
inter-duplicate space is needed, it slightly reduces the overall letter speed of
the message.

* The Message field serves double duty. When “Send Random Letters” is selected,
the letters sent are recorded in this field. When it is not selected, the
contents of this field are sent. Only letters and numbers are sent; punctuation
is ignored. You can only edit this field when “Send Random Letters” is not
selected.

* To send a message that you have prepared beforehand, open the file and
copy-and-paste the message into the Message field.

* “Back View” is used when you wish to send a message with real flags, but
aren’t sure you know the code. This is intended for use by the counselor while
sending to scouts.
