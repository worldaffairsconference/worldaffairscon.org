import React from 'react';
import { Container } from 'react-bootstrap';
import KeynoteAddresses from '../components/KeynoteAddresses';
import EHennessey from '../img/speakers/current/ehennessey.png';
import MMcCallum from '../img/speakers/current/mmccallum.png';
import VWaboose from '../img/speakers/current/vwaboose.jpg';

const Events = () => {
  return (
    <Container id="events" className="mt-4">
      <KeynoteAddresses
        title="The Future of Diversity, Equity and Inclusion: STEM and Beyond"
        speaker="Roundtable Discussion"
        description="In today’s society, the importance of representation has become increasingly prevalent. Discussions on gender, racial, and ethnic prejudices are taking place on a global level, examining the importance and value of an inclusive and diverse environment. Students will learn more about societal biases, as well as the future of workplace environments taking on diversity, equity and inclusion (DEI) policies. This plenary will be a roundtable discussion offering an interactive environment for students to learn, and ask any questions for the plenary speaker."
        image={EHennessey}
        addressName="Eden Hennessey"
        addressRole="Head of Equity, Diversity, and Inclusion and Director of the Women in Science Program at Wilfrid Laurier University"
        text="Dr. Eden Hennessey (she/her) is a Social Psychologist who researches and mobilizes knowledge related to diversity promotion and discrimination reduction. Dr. Hennessey advocates for equity and inclusion on university campuses and combines arts with data to impact world-wide audiences. She is deeply committed to her work as the Manager of the Centre for Student Equity, Diversity, and Inclusion (CSEDI) at Wilfrid Laurier University and as the Research and Programs Director of the Laurier Centre for Women in Science (WinS)."
      />
      <div className="mt-4">
        <KeynoteAddresses
          title="From Parliament Hill to Turtle Island: The Future for Canadian Truth and Reconciliation"
          description="The history of Canada is both of pride and tragedy. Over the past centuries the First Nations people of our country have endured oppression and disenfranchisement. The time is now to right past wrongs from Parliament Hill to our own communities. Join Canadian Senator Mary Jane McCallum and Specialist in Indigenous legal traditions Dr. Valarie Waboose as we discuss the path forward for Truth and Reconciliation in Canada, and learn about our own roles in the journey towards justice."
          speaker="Roundtable Discussion"
          image={MMcCallum}
          addressName="Sen. Mary Jane McCallum"
          addressRole="Canadian Senator"
          text="Senator Mary Jane McCallum is a residential school survivor and truth and reconciliation educator. She is the first Indigenous woman to be elected to the senate. Dr. McCallum is a First Nations woman of Cree heritage and an advocate for social justice who, over the course of her distinguished career, has provided dental care to First Nations communities across Manitoba. "
        />
        <KeynoteAddresses
          image={VWaboose}
          addressName="Valarie Waboose"
          addressRole="Assistant Professor, Windsor Law"
          text="Valarie Waboose is an Assistant Professor at Windsor Law. Her areas of specialization include Indigenous legal traditions, the legacy of residential schools, and the ways in which First Nations within Canada reconcile with their past. Dr. Waboose is a member of the Three Fires Midewiwin Society and is interested in conducting research and expanding knowledge in the areas of Anishinabe Indigenous knowledge and Indigenous research methodologies. Her Indigenous knowledge is interwoven with the pedagogical methodologies she utilizes within the classroom setting. As an Anishinabe Kwe, she believes in sharing her knowledge with non-Indigenous students so that they can better serve their clients when they enter the legal profession."
        />
      </div>
    </Container>
  );
};
export default Events;
