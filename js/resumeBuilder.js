/* Helper class for generating formatted content */
var Content = function(content, formatString) {
    this.content = content;
    this.formatString = formatString;
};

Content.prototype.formattedContent = function() {
    return this.formatString.replace('%data%', this.content);
};

Content.prototype.prependTo = function(selector) {
    $(selector).prepend(this.formattedContent());
};

Content.prototype.appendTo = function(selector) {
    $(selector).append(this.formattedContent());
};


/* Data Objects */
var bio = {
    name: 'Justin Cunningham',
    role: 'Software Engineer',
    contacts: {
        mobile: '623-555-1015',
        email: 'justin@fake.com',
        github: 'jcnnghm',
        twitter: 'jcnnghm',
        location: 'Redwood City, CA'
    },
    welcomeMessage: 'Entrepreneurial Back-End Developer Learning Front-End',
    skills: ['Ruby', 'Python'],
    biopic: 'images/fry.jpg',
    display: function() {
        // Insert name and role
        new Content(this.role, HTMLheaderRole).prependTo('#header');
        new Content(this.name, HTMLheaderName).prependTo('#header');

        // Insert contact information
        var contactToFormatMap = {
            mobile: HTMLmobile,
            email: HTMLemail,
            github: HTMLgithub,
            twitter: HTMLtwitter,
            blog: HTMLblog,
            location: HTMLlocation
        }
        for (var contact in this.contacts) {
            new Content(this.contacts[contact], contactToFormatMap[contact]).appendTo('#topContacts');
            new Content(this.contacts[contact], contactToFormatMap[contact]).appendTo('#footerContacts');
        }

        // Insert bio data
        new Content(this.biopic, HTMLbioPic).appendTo('#header');
        new Content(this.welcomeMessage, HTMLWelcomeMsg).appendTo('#header');

        // Insert skills
        $('#header').append(HTMLskillsStart);
        this.skills.forEach(function(skill) {
            new Content(skill, HTMLskills).appendTo('#skills');
        });
    }
};

var work = {
    jobs: [
        {
            employer: 'Yelp',
            title: 'Technical Lead',
            location: 'San Francisco, CA',
            dates: 'January 2015 - Present',
            description: 'Leading the BAM Team to complete Yelp\'s real-time data pipeline.'
        },
        {
            employer: 'Yelp',
            title: 'Software Engineer',
            location: 'San Francisco, CA',
            dates: 'September 2013 - December 2014',
            description: 'Worked on data warehousing and data infrastructure.'
        }
    ],
    display: function() {
        this.jobs.forEach(function(job) {
            $('#workExperience').append(HTMLworkStart);
            // Insert job

            // This is a compound tag, so we need to insert both the opening
            // and closing tag at the same time.
            var formattedEmployer = new Content(job.employer, HTMLworkEmployer).formattedContent();
            var formattedTitle = new Content(job.title, HTMLworkTitle).formattedContent();
            $('.work-entry:last').append(formattedEmployer + formattedTitle);

            new Content(job.dates, HTMLworkDates).appendTo('.work-entry:last');
            new Content(job.location, HTMLworkLocation).appendTo('.work-entry:last');
            new Content(job.description, HTMLworkDescription).appendTo('.work-entry:last');
        });
    }
};

var projects = {
    projects: [
        {
            title: 'Data Pipeline',
            dates: 'June 2014 - Present',
            description: 'Real-time data pipeline for built using ' +
                'Storm, Kafka and Avro',
            images: ['images/197x148.gif', 'images/197x148.gif']
        },
        {
            title: 'Yelp Gem',
            dates: 'February 2014 - August 2014',
            description: 'Responsible for code quality and all pre-release ' +
                'code reviews.',
            images: ['images/197x148.gif', 'images/197x148.gif']
        }
    ],
    display: function() {
        this.projects.forEach(function(project) {
            // Insert Project
            $('#projects').append(HTMLprojectStart);
            new Content(project.title, HTMLprojectTitle).appendTo('.project-entry:last');
            new Content(project.dates, HTMLprojectDates).appendTo('.project-entry:last');
            new Content(project.description, HTMLprojectDescription).appendTo('.project-entry:last');

            // Insert project images
            project.images.forEach(function(image){
                new Content(image, HTMLprojectImage).appendTo('.project-entry:last');
            });
        });
    }
};

var education = {
    schools: [
        {
            name: 'Harvard University Extension School',
            location: 'Cambridge, MA',
            degree: 'Master of Liberal Arts',
            majors: ['Management (Finance)'],
            dates: 2014,
            url: 'http://www.extension.harvard.edu/'
        },
        {
            name: 'University of Maryland, University College',
            location: 'Adelphi, MD',
            degree: 'Bachelor of Science',
            majors: ['Computer Science'],
            dates: 2012,
            url: 'http://www.umuc.edu/'
        }
    ],
    onlineCourses: [
        {
            title: 'Intro to HTML and CSS',
            school: 'Udacity',
            date: 2015,
            url: 'https://www.udacity.com/course/ud304'
        },
        {
            title: 'Javascript Basics',
            school: 'Udacity',
            date: 2015,
            url: 'https://www.udacity.com/course/ud804'
        }
    ],
    display: function() {
        // Insert schools
        this.schools.forEach(function(school) {
            $('#education').append(HTMLschoolStart);

            // This is a compound tag, so we need to insert both the opening
            // and closing tag at the same time.
            var formattedName = new Content(school.name, HTMLschoolName).formattedContent();
            var formattedDegree = new Content(school.degree, HTMLschoolDegree).formattedContent();
            $('.education-entry:last').append(formattedName + formattedDegree);

            new Content(school.dates, HTMLschoolDates).appendTo('.education-entry:last');
            new Content(school.location, HTMLschoolLocation).appendTo('.education-entry:last');

            // Insert the majors
            school.majors.forEach(function(major) {
                new Content(major, HTMLschoolMajor).appendTo('.education-entry:last');
            });
        });

        // Insert online courses
        if (this.onlineCourses.length > 0) {
            $('#education').append(HTMLonlineClasses);
        }
        this.onlineCourses.forEach(function(course){
            // Courses need to be in an .education-entry
            $('#education').append(HTMLschoolStart);

            // This is a compound tag, so we need to insert both the opening
            // and closing tag at the same time.
            var formattedTitle = new Content(course.title, HTMLonlineTitle).formattedContent();
            var formattedSchool = new Content(course.school, HTMLonlineSchool).formattedContent();
            $('.education-entry:last').append(formattedTitle + formattedSchool);

            new Content(course.date, HTMLonlineDates).appendTo('.education-entry:last');
            new Content(course.url, HTMLonlineURL).appendTo('.education-entry:last');
        });
    }
};

var mapData = {
    display: function() {
        $('#mapDiv').append(googleMap);
    }
};


/* Display resume content */
bio.display();
work.display();
projects.display();
education.display();
mapData.display();