import { useEffect, useRef } from 'react';
import { ConversationalForm } from 'conversational-form';
import Bow from '../assets/bow-and-arrow.jpg'
import Sword from '../assets/sword.webp'
import Staff from '../assets/magic-staff.jpg'
import Mountain from '../assets/mountains.jpeg'
import Sea from '../assets/sea.jpg'
import Town from '../assets/town.jpg'

const MyForm = (props) => {
  const elemRef = useRef(null);
  const cfRef = useRef(null);

  // Form fields definition
const formFields = [
  // Question 1: weapon choice via images
  {
    tag: 'cf-robot-message',
    'cf-questions': "You startle awake in a stone room filled with dim, blue glow."
  },
  {
    tag: 'cf-robot-message',
    'cf-questions': "Water trickles around you, the sound echoing through the cavernous space."
  },
  {
    tag: 'input',
    type: 'radio',
    name: 'weapon',
    'cf-questions': ' Your hand immediately reaches out for your weapon, a…',
    'cf-label': 'Sword',
    value: 'sword',
    'cf-image': Sword
  },
  {
    tag: 'input',
    type: 'radio',
    name: 'weapon',
    'cf-label': 'Bow and Arrows',
    value: 'bow and arrow', 
    'cf-image': Bow
  },
  {
    tag: 'input',
    type: 'radio',
    name: 'weapon',
    'cf-label': 'Magic Staff',
    value: 'magic staff',
    'cf-image': Staff
  },
  {
    tag: 'cf-robot-message',
    'cf-questions': "Ah, your trusty {weapon}."
  },
  {
    tag: 'cf-robot-message',
    'cf-questions': "Your head aches as you try and recall what happened."
  },
  // Question 2:
  {
    tag: 'input',
    type: 'text',
    name: 'heroName',
    id: 'name',
    'cf-input-placeholder': 'Tav',
    'cf-questions': `What is your name?`,
    required: true
  },
  // Question 2: visual description free-text
  {
    tag: 'cf-robot-message',
    'cf-questions': "{name}. Your name is {name}!"
  },
  {
    tag: 'cf-robot-message',
    'cf-questions': "You don't know what this strange cavern is, but you have vague memories of home."
  },
  {
    tag: 'input',
    type: 'radio',
    name: 'hometown',
    'cf-questions': 'You feel yourself calm as you remember...',
    'cf-label': 'The Mountains',
    value: 'a mountain village',
    'cf-image': Mountain
  },
  {
    tag: 'input',
    type: 'radio',
    name: 'hometown',
    'cf-label': 'The Seaside',
    value: 'a seaside town', 
    'cf-image': Sea
  },
  {
    tag: 'input',
    type: 'radio',
    name: 'hometown',
    'cf-label': 'a bustling town',
    value: 'town',
    'cf-image': Town
  },
  {
    tag: 'input',
    type: 'text',
    name: 'physicalDescription',
    'cf-input-placeholder': 'A human/elf/dwarf with {hairColor} hair and {eyeColor}.',
    'cf-questions': 'You peer into a shallow pool nearby and see your reflection shimmering back. Describe {name}, from the ripple of your cloak to the glint in your eyes.'
  },
  {
    tag: 'cf-robot-message',
    'cf-questions': "You glance up from the pool and see a line of writing on the wall."
  },
  {
    tag: 'cf-robot-message',
    'cf-questions': "Instinctively, you reach for your pack, grabbing your notebook and a quill to write it down."
  },
  // Question 3: phone number (rune-code)
  {
    tag: 'input',
    type: 'tel',
    name: 'phone',
    'cf-questions': 'It consists of a simple cross followed by a sequence of numbers.',
    'cf-input-placeholder': 'Your whatsapp number, e.g., +447070123456',
    'cf-error': 'Please enter your WhatsApp enabled number in e.164 format, e.g., +447070123456',
    required: true
  },
];


  // submit callback
  const submitCallback = () => {
    if (cfRef.current) {
      const formDataSerialized = cfRef.current.getFormData(true);
      formDataSerialized.weapon = formDataSerialized.weapon[0]
      formDataSerialized.hometown = formDataSerialized.hometown[0]
      console.log("Formdata, obj:", formDataSerialized);
      analytics.track("character_created", formDataSerialized)
      analytics.identify(formDataSerialized)
      cfRef.current.addRobotChatResponse(
        "The symbols on the wall flare with golden light as you finish transcribing them, warping and twisting away. The wall below them begins to dissolve."
      )
      cfRef.current.addRobotChatResponse(
        "You see the world beyond, and the numbers morph into words:"
      );
      cfRef.current.addRobotChatResponse(
        "MAY YOUR JOURNEY BEGIN!"
      );
    }
  };

  useEffect(() => {
    // mount logic
    cfRef.current = ConversationalForm.startTheConversation({
      options: {
        submitCallback: submitCallback,
        preventAutoFocus: true
        // loadExternalStyleSheet: false
      },
      tags: formFields
    });
    if (elemRef.current && cfRef.current && cfRef.current.el) {
      elemRef.current.appendChild(cfRef.current.el);
    }

    // cleanup when unmounting
    return () => {
      if (cfRef.current) {
        cfRef.current.remove(); // if the library supports a remove/unmount method
        cfRef.current = null;
      }
    };
  }, []); // empty deps so this runs once on mount

  return (
    <div>
      <div ref={elemRef} />
    </div>
  );
};

export default MyForm;
