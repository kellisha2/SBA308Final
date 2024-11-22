const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  function getAssignmentPossiblePoints(assignmentId) {
    try {
        let points_possible;
        AssignmentGroup.assignments.forEach(assignment => {
            if (assignment.id === assignmentId) {
                points_possible = assignment.points_possible;
            }
        });
        if (points_possible === undefined) {
            throw new Error(`Assignment with ID ${assignmentId} not found.`);
        }
        return points_possible;
    } catch (error) {
        console.error(`Error retrieving assignment points for ID ${assignmentId}: ${error.message}`);
        return 0;
    }
  }

  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = [
    //   {
    //     id: 125,
    //     avg: 0.985, // (47 + 150) / (50 + 150)
    //     1: 0.94, // 47 / 50
    //     2: 1.0 // 150 / 150
    //   },
    //   {
    //     id: 132,
    //     avg: 0.82, // (39 + 125) / (50 + 150)
    //     1: 0.78, // 39 / 50
    //     2: 0.833 // late: (140 - 15) / 150 -> 10%
    //   }
    ];

    const currentDate = new Date();

  

    submissions.forEach(submissionElement => {
        // let resultObj = {
        //     // id: 125,
        //     // avg: 0.985, 
        //     // 1: 0.94,
        //     // 2: 1.0
        // }
     
        //   let learnerId = submissionElement.learner_id;
        try {
            const learnerId = submissionElement.learner_id;
            const assignmentId = submissionElement.assignment_id;
            let score = submissionElement.submission.score;

            // Get assignment details
            let assignment = null;
            for (let i = 0; i < ag.assignments.length; i++) {
                if (ag.assignments[i].id === assignmentId) {
                    assignment = ag.assignments[i];
                    break;
                }
            }

            if (!assignment) {
                throw new Error(`Assignment with ID ${assignmentId} not found.`);
            }

            const pointsPossible = assignment.points_possible;
            const dueDate = new Date(assignment.due_at);
            const submittedDate = new Date(submissionElement.submission.submitted_at);

            if (dueDate > currentDate) {
                return;
            }

            if (submittedDate > dueDate) {
                const latePenalty = pointsPossible * 0.1;
                score = score - latePenalty;
            }

            let learnerData = null;
            for (let i = 0; i < result.length; i++) {
                if (result[i].id === learnerId) {
                    learnerData = result[i];
                    break;
                }
            }

            if (!learnerData) {
                learnerData = { id: learnerId, avg: 0 };
                result.push(learnerData);
            }

            learnerData[assignmentId] = score / pointsPossible;

        } catch (error) {
            console.error(`Error processing submission: ${error.message}`);
        }
    });