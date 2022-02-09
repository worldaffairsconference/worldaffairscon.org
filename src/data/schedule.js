const Schedule = [
  {
    name: 'Opening Remarks',
    events: [
			{
				event: 'Opening Remarks',
				speaker: '',
				timeOrRecording: '9:00 AM'
			},
			{
				event: 'Keynote',
				speaker: 'Prof. Scott Galloway',
				recording: true,
			}
		],
  },
  {
    name: 'Networking',
		time: '9:55 AM',
    events: [],
  },
  {
    name: 'Plenary 1',
    events: [
			{
				event: 'Re-Searching Into our Digital Future: A Token For Tomorrow',
				speaker: 'Jamie Leverton',
				recording: true,
			},
			{
				event: 'Advancing Education: New Opportunities, New Possibilities',
				speaker: 'Dr. Xiaoyang Liang',
				recording: true,
			},
		],
  },
  {
    name: 'Plenary 2',
    events: [
			{
				event: 'The Future of Diversity, Equity and Inclusion: STEM and Beyond',
				speaker: 'Eden Hennessey',
				recording: true,
			},
			{
				event: 'From Parliament Hill to Turtle Island: The Future for Canadian Truth and Reconciliation',
				speaker: 'Sen. Mary Jane McCallum & Valarie Waboose',
				recording: true,
			},
		],
  },
	{
		name: 'Lunch & Startup Exhibition',
		events: [],
		time: '11:15 AM',
	},
	{
    name: 'Plenary 3',
    events: [
			{
				event: 'Re-Searching Into our Digital Future: A Token For Tomorrow',
				speaker: 'John Hammond',
				recording: true,
			},
			{
				event: 'Advancing Education: New Opportunities, New Possibilities',
				speaker: 'Sarah Gallagher',
				recording: true,
			},
		],
  },
	{
		name: 'Networking',
		events: [],
		time: '12:50 PM',
	},
	{
    name: 'Plenary 4',
    events: [
			{
				event: 'Rethinking Sustainability: Innovations for the Environment',
				speaker: 'Tom Szaky',
				recording: true,
			},
			{
				event: 'Rethinking Sustainability: Innovations for the Environment',
				speaker: 'Jean-Francois Gauthier',
				recording: true,
			},
		],
  },
	{
		name: 'Closing Remarks',
		events: [
			{
				event: 'Keynote #2',
				speaker: 'Honourable Ahmed Hussen',
				recording: true,
			},
			{
				event: 'Closing Remarks',
				speaker: '',
				timeOrRecording: '2:00 PM',
			},
		]
	}
];
export default Schedule;
