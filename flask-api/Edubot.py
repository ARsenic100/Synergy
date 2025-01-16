from flask import Flask, request, jsonify
import google.generativeai as genai

# Configure the Gemini API with your API key
genai.configure(api_key="process.env.GEMINI_API_KEY")
model = genai.GenerativeModel("gemini-1.5-flash")

# Define the chatbot prompt
chatbot_prompt = """
You are EduBot to help schools in their transition from odd school structure to standard. You provide assistance to user questions based on SAMAGRA SHIKSHA, An Integrated Scheme for School Education, FRAMEWORK FOR IMPLEMENTATION.

here is a summary of samagraa shiksha framewrk , dont give refernce of chapter number and pages , dont mention samagra shiksha framework in answwers, just answer query based on the summary , just like if you are talking to user in person , make words like humans.

DRAFT DOCUMENT
1
SAMAGRA SHIKSHA
An Integrated Scheme for
School Education
FRAMEWORK FOR IMPLEMENTATION
Ministry of Human Resource Development
Department of School Education and Literacy

DRAFT DOCUMENT
2
CONTENTS
CHAPTER 1 – Introduction .......................................................................................................................... 3
Chapter 2 – School Access, Infrastructure Development and Retention ................................................ 9
Chapter 3 – Addressing Gender and Equity issues in School Education .............................................. 39
Chapter 4 – Inclusion of Children with Special Needs in Education ..................................................... 60
Chapter 5 – Quality Interventions ............................................................................................................... 71
Chapter 6 – Teacher Education and Teacher Training ............................................................................ 96
Chapter 7 – Information and Communication Technology (ICT) in School Education ................... 127
Chapter 8 – Vocationalisation of School Education .............................................................................. 138
Chapter 9 – Pre-school Education ............................................................................................................ 152
Chapter 10 – Programme Management ................................................................................................... 161
List of Annexures
Annexure I: framework Norms for Intervention for Infrastructure Development and Maintenance Under
Samagra Shiksha ............................................................................................................................................. 30
Annexure-II: Girls Hostel (As per norms for KGBV / Girls Hostel) .............................................................. 37
ANNEXURE-III: Guidelines for appointment of special educators ............................................................... 67
Annexure-IV: Guidelines for conducting written examination for Persons with disabilities .......................... 68
Annexure-V(a): Infrastructural Requirement for SCERT “Model 1” ........................................................... 123
Annexure-V(b):Infrastructural Requirement for SCERT “Model 2” ............................................................ 124
Annexure-VI: Suggested Physical Norms for the buildings of a DIET ........................................................ 125
Annexure-VII: Curriculum Framework: Two-Year B.Ed. Programme (by NCTE) ..................................... 137
Annexure-VII: Results Framework Monitoring Implementation of RTE Act 2009 (RFD for Elementary
Education)...................................................................................................................................................... 187
Annexure-VIII: Results Framework Document for Planning and Monitoring Outcomes of the Samagra
Shiksha .......................................................................................................................................................... 191
Appendix: Programmatic and Financial Norms for the Components under the Scheme.............................. 197
DRAFT DOCUMENT
3
CHAPTER 1 – INTRODUCTION
1.1 Background
1.1.1 Education is the most important tool for social, economic and political transformation and a
key instrument for building an equitable society. A well-educated population, equipped with the
relevant knowledge, attitudes and skills is essential for economic and social development in the
twenty-first century. Education also acts as an integrative force in society, imparting values that
foster social cohesion and national identity1
. Before 1976, education was the exclusive
responsibility of the States. The Constitutional Amendment of 1976 included education in the
Concurrent List. While the role and responsibility of the States in education remained largely
unchanged, the Union Government accepted a larger responsibility of reinforcing the national and
integrated character of education, maintaining quality and standards including those of the teaching
profession at all levels, and the study and monitoring of the educational requirements of the
country.
1.1.2 With the formulation of National Policy on Education (NPE), 1986, India initiated a wide
range of programmes for achieving the goal of Universalisation of Elementary Education
(UEE).These efforts were intensified in the 1980s and 1990s through several schematic and
programme interventions, such as Operation Black Board (OBB), Shiksha Karmi Project (SKP),
Andhra Pradesh Primary Education Project (APPEP), Bihar Education Project (BEP), U.P. Basic
Education Project (UPBEP), Mahila Samakhya (MS), Lok Jumbish Project (LJP), District Primary
Education Programme (DPEP) and the Sarva Shiksha Abhiyan (SSA) – the flagship Centrally
Sponsored Scheme in partnership with State Governments for UEE across the country. This was
further strengthened with the passage of the Right of Children to Free and Compulsory Education
(RTE) Act, 2009 which gave a legal mandate to provide free and compulsory elementary education
to every child in the age group of 6-14 years.States and UTs were supported in the implementation
of the RTE Act, 2009 through the Centrally Sponsored Scheme of SSA. The norms of the Scheme
were aligned with the provisions of the Act with effect from September, 2010.
1.1.3 A successful programme of UEE is the precondition for taking the first reliable step towards
Universal Secondary Education. The NPE emphasised improving equitable access to secondary
education and the enrolment of girls, SCs and STs, particularly in science, commerce and
vocational streams (Para 5.13 of the NPE, 1986). The NPE and the Programme of Action (POA),
1992 while recognising secondary education as a critical instrument for social change, called for its
planned expansion. The NPE, (as modified in 1992) specifically laid emphasis again on increasing
access to secondary education with particular focus on participation of girls, SCs and STs;
increased autonomy of Boards of Secondary Education to enhance their ability to improve quality;
introduction of ICT in school curriculum for coping with globalisation; renewed emphasis on work
ethos and values of a humane and composite culture in the curricula; and vocationalisation
through specialised institutions or through the refashioning of secondary education to meet the
manpower requirements of the growing Indian economy (Para 5.13 to 5.15). The Rashtriya
Madhyamik Shiksha Abhiyan (RMSA) scheme initiated in 2009, demonstrated the government’s

1
India, Planning Commission, Twelfth Five Year Plan (2012-2017) Volume-III, p. 48
DRAFT DOCUMENT
4
ambition for a secondary education system that can support India’s growth and development. In the
year 2013-14, four other Centrally-sponsored Schemes for secondary education viz., ICT in
Schools, Girls’ Hostel, Vocationalisation of Secondary and Senior Secondary Education and
Inclusive Education for Disabled at Secondary Stage (IEDSS) were subsumed under RMSA. This
was done to provide for convergence based implementation of different programmes for secondary
education with inclusion of aided schools for quality related interventions and Senior Secondary
segment for certain components.
1.1.4 The Centrally Sponsored Scheme of Restructuring and Reorganization of Teacher Education
(CSSTE) was initiated in 1987 pursuant to the formulation of the NPE, 1986. The NPE stated that
improvement in the status and professional competence of teachers is the corner stone of
educational reconstruction and envisaged teacher education as a continuous process with preservice and in-service training being its inseparable components. District Institute of Teacher
Education (DIETs), Colleges of Teacher Education (CTEs), and Institutes of Advanced Studies in
Education (IASEs) were, therefore, established. Thus, the CSSTE Scheme aimed to provide
infrastructural and institutional support to Government Teacher Education Institutions (TEIs).
1.1.5 It is, therefore, evident that the Centrally Sponsored Schemes of SSA, RMSA and TE were
the three major school education development programmes of the Ministry of Human Resource
development (MHRD), Government of India being implemented in partnership with State/UTs. The
common objectives of all the Schemes are to enhance access through the expansion of quality
school education; to promote equity through the inclusion of disadvantaged groups and weaker
sections, and to improve the quality of education for all. While the SSA covered the elementary
level (grades I-VIII) and was the vehicle for implementation of the RTE Act, 2009, the RMSA
covered grades IX-X (IX-XII for certain components. CSSTE provided for teachers’ education
through an institutional setup for both pre-service and in-service training across classes I-X.
Further, with the role of SCERT as an academic authority u/s 29(1) of the RTE Act, the focus was
on strengthening of SCERTs and DIETs. With the persistent efforts of the Central and the State
Governments, these schemes have significantly addressed several major gaps in the school
education system and have significantly contributed towards laying a strong foundation for an
equitable quality school education system in the country. However, the major challenge is provision
of quality education. The focus of the Central Government is now on encouraging States to take
steps for improvement in quality of education.
1.2 Towards Samagra Shiksha – An Integrated Scheme for School Education
1.2.1 The Government has, till now, tried to adopt an integrated approach in the implementation
of the various Centrally Sponsored Schemes. However, overtime, parallel institutional arrangements
at national, state, district and sub-district levels with little convergence with mainstream school
education administration have been created for the planning and management of these Schemes.
This may have led to a duplication of efforts and personnel towards implementing similar
interventions and achieving similar objectives. Independent evaluations of the Schemes have
suggested increased convergence and integration between the Schemes through a single school
education development programme covering grades I-X/XII. This would help in instilling allocative
efficiency and optimal utilization of budgetary and human resources. Many States have already
DRAFT DOCUMENT
5
strived to attain convergence between the two Schemes by making one State Project Director (SPD)
in-charge of the implementation of SSA and RMSA. Recognising the potential gains from
convergence, an advisory dated 16th November, 2017 on integrating the administrative structures at
various levels created for SSA and RMSA in the States to achieve productive synergies, better coordination and economies of administrative costs was sent to all States and UTs. The creation of a
single administrative structure would also assist in developing a school sector-wide strategy
stressing on improvement in quality of education.
1.2.2 Given the shift in the approach to development of school education from input-based to
outcome based central sector interventions as envisaged in the document entitled, India: Three-Year
Action Agenda, 2017/18 to 2019/20 (NITI Aayog, 2017)
2
, a ‘paradigm shift’ is envisaged in the
approach to central sector spending on school education. The Union Budget, 2018-19, has proposed
to treat school education holistically without segmentation from pre-school to Class 12. An
overarching programme for the school education sector extending from pre-school to class 12 has
been, therefore, prepared with the broader goal of improving school effectiveness measured in
terms of equal opportunities for schooling and equitable learning outcomes. This sector-wide
development programme/scheme would also help harmonise the implementation mechanisms and
transaction costs at all levels, particularly in using state, district and sub-district level systems and
resources, besides envisaging one comprehensive strategic plan for development of school
education at the district level. The shift in the focus is from project objectives to improving systems
level performance and schooling outcomes which will be the emphasis of the combined Scheme
along-with incentivizing States towards improving quality of education.
1.2.3 The Samagra Shiksha – An Integrated Scheme on School Education envisages the ‘school’
as a continuum from pre-school3
, primary, upper primary, secondary to Senior Secondary levels.
The vision of the Scheme is to ensure inclusive and equitable quality education from pre-school to
senior secondary stage in accordance with the Sustainable Development Goal (SDG) for
Education4
.

2
 Available at http://niti.gov.in/writereaddata/files/coop/IndiaActionPlan.pdf
3
Pre-schools referred to by all nomenclatures such as Balwadi, pre-nursery, nursery, preschool, preparatory, preprimary, LKG, UKG, pre-nurseries, play centres, crèches, BalVatikas etc.
4
https://sustainabledevelopment.un.org/sdg4
The Goal SDG-4.1 states that “By 2030, ensure that all boys and girls
complete free, equitable and quality primary and secondary education
leading to relevant and effective learning outcomes”.
Further the SDG 4.5 states that “By 2030, eliminate gender disparities in
education and ensure equal access to all levels of Education and
vocational training for the vulnerable, including persons with disabilities,
indigenous peoples and children in vulnerable situations”.
DRAFT DOCUMENT
6
1.2.4 The major objectives of the Scheme are provision of quality education and enhancing
learning outcomes of students; Bridging Social and Gender Gaps in School Education; Ensuring
equity and inclusion at all levels of school education; Ensuring minimum standards in schooling
provisions; Promoting Vocationalisation of education; Support States in implementation of Right of
Children to Free and Compulsory Education (RTE) Act, 2009; and Strengthening and up-gradation
of State Councils of Educational Research and Training (SCERTs)/State Institutes of Education
(SIE) and DIET as a nodal agencies for teacher training. The main outcomes of the Scheme are
envisaged as Universal Access, Equity and Quality, promoting Vocationalisation of Education and
strengthening of Teacher Education Institutions (TEIs).
1.2.5 The Scheme will be implemented as a Centrally Sponsored Scheme by the Department
through a single State Implementation Society (SIS) at the State/UT level. At the National level,
there would be a Governing Council (GC) headed by Minister of Human Resource Development
and a Project Approval Board (PAB) headed by Secretary, Department of School Education and
Literacy. The GC will be empowered to modify financial and programmatic norms and approve the
detailed guidelines for implementation within the overall Framework of the scheme. Such
modifications will include innovations and interventions to improve the quality of school education.
The Department will be assisted by a Technical Support Group (TSG) at Educational Consultants of
India Limited (EdCIL) to provide technical support in functional areas pertaining to access, equity
and quality education by merging the TSGs of the Schemes of SSA, RMSA and TE. States would
be expected to bring a single Plan for the entire school education sector.
1.2.6 The fund sharing pattern for the scheme between Centre and States is at present in the ratio
of 90:10 for the 8 North-Eastern States viz. Arunachal Pradesh, Assam, Manipur, Meghalaya,
Mizoram, Nagaland, Sikkim and Tripura and 3 Himalayan States viz. Jammu & Kashmir, Himachal
Pradesh and Uttarakhand and 60:40 for all other States and Union Territories with Legislature. It is
100% centrally sponsored for Union Territories without Legislature. This is in accordance with the
recommendations of the Sub-Group of Chief Ministers on Rationalization of Centrally Sponsored
Schemes received in October, 20155
.
1.2.7 The major interventions, across all levels of school education, proposed under the scheme
are: (i) Universal Access including Infrastructure Development and Retention; (ii) Gender and
Equity; (iii) Inclusive Education; (iv) Quality; (v) Financial support for Teacher Salary; (vi) Digital
initiatives; (vii) RTE Entitlements including uniforms, textbooks etc.;(viii) Pre-school Education;
(ix) Vocational Education; (x) Sports and Physical Education; (xi) Strengthening of Teacher
Education and Training; (xii) Monitoring; (xiii) Programme Management; and (xiii) National
Component. It is proposed that preference in the interventions would be given to Educationally
Backward Blocks (EBBs), LWE affected districts, Special Focus Districts (SFDs), Border areas and
the 115 Aspirational districts. The programmatic and financial norms under the Scheme are detailed
at Appendix.
1.2.8 The main emphasis of the Scheme is on improving quality of school education by focussing
on the two T’s – Teacher and Technology. The strategy for all interventions under the Scheme

5
 Available at http://niti.gov.in/writereaddata/files/Final%20Report%20of%20the%20SubGroup%20submitter%20to%20PM.pdf
DRAFT DOCUMENT
7
would be to enhance the Learning Outcomes at all levels of schooling. The scheme proposes to
give flexibility to the States and UTs to plan and prioritize their interventions within the scheme
norms and the overall resource envelope available to them. Funds are proposed to be allocated
based on an objective criteria based on enrolment of students, committed liabilities, learning
outcomes and various performance indicators.
1.2.9 The Scheme will help improve the transition rates across the various levels of school
education and aid in promoting universal access to children to complete school education. The
integration of Teacher Education would facilitate effective convergence and linkages between
different support structures in school education through interventions such as a unified training
calendar, innovations in pedagogy, mentoring and monitoring, etc. This single Scheme will enable
the SCERT to become the nodal agency for conduct and monitoring of all in-service training
programmes to make it need-focused and dynamic. It would also enable reaping the benefits of
technology and widening the access of good quality education across all States and UTs and across
all sections of the Society.
1.3 RTE Roadmap under the integrated scheme
1.3.1 In a historic move, the Constitution (Eighty-sixth Amendment) Act, 2002 inserted Article
21-A in the Constitution of India to provide free and compulsory education of all children in the age
group of six to fourteen years as a Fundamental Right in such a manner as the State may, by law,
determine. The RTE Act, 20096
, which represents the consequential legislation envisaged under
Article 21-A, has become effective on 1st April 2010. This act provides a justiciable legal
framework that entitles all children between the ages of 6-14 years free and compulsory admission,
attendance and completion of elementary education. Most importantly, it provides for children’s
right to an education that is free from fear, stress and anxiety.
1.3.2 The Integrated Scheme would support States and UTs in implementation of the RTE Act,
2009. The Scheme envisages providing an equitable and inclusive quality education which would
be guided by the following principles7
:
(i) Holistic (SAMAGRA) view of education, as interpreted in the National Curriculum
Framework 2005, with implications for a systemic revamp of the entire content and
process of education with significant implications for curriculum, teacher education,
educational planning and management.
(ii) Equity, to mean not only equal opportunity, but also creation of conditions in which the
disadvantaged sections of the society – children of SC, ST, Muslim minority, landless
agricultural workers and children with special needs, etc. – can avail of the opportunity.
(iii) Access, not to be confined to ensuring that a school becomes accessible to all children
within specified distance but implies an understanding of the educational needs and
predicament of the traditionally excluded categories – the SC, ST and others sections of

6
http://mhrd.gov.in/rte_rules
7
The guiding principles are based on the report for which in September 2009, the Government had set up a Committee
under the chairpersonship of Shri Anil Bordia, former Union Education Secretary, to suggest follow up action on SSA
vis-à-vis the RTE Act. The Committee submitted a report in April 2010, entitled “Implementation of RTE Act and
Resultant Revamp of SSA”.
DRAFT DOCUMENT
8
the most disadvantaged groups, the Muslim minority, girls in general, and children with
special needs.
(iv) Gender concerns, implying not only an effort to enable girls to keep pace with boys but
to use education as a decisive intervention to bring about a basic change in the status of
women.
(v) Centrality of teacher, to motivate them to innovate and create a culture in the classroom,
and beyond the classroom, that might produce an inclusive environment for children,
especially for girls from oppressed and marginalised backgrounds.
(vi) Moral compulsion is imposed through the RTE Act on parents, teachers, educational
administrators and other stakeholders, rather than shifting emphasis on punitive
processes.
(vii) Convergent and integrated system of educational management is pre-requisite for
implementation of the RTE law. All states must move in that direction as speedily as
feasible.
 The Framework for Implementation of the Scheme provides a broad outline of approaches
and implementation strategies, within which the States can frame detailed guidelines keeping in
view their specific social, economic, institutional contexts and legal commitments under the RTE
Act, 2009.

DRAFT DOCUMENT
9
CHAPTER 2 – SCHOOL ACCESS, INFRASTRUCTURE DEVELOPMENT AND
RETENTION
2.1 Scope
2.1.1 The Scheme covers all children from the age of 4 to 18 years and has a scope across all
levels of school education from Pre-school to Senior Secondary. Provision of schools on a universal
basis is the pre-requisite to ensure the education of all children. Along with universal access,
ensuring retention of children till completion of schooling is one of the major objectives of the
Scheme.
Access
2.2 Introduction
2.2.1 As the aim of the scheme is to universalise quality school education, expansion of schooling
facilities in the uncovered areas would be the first priority. The Integrated Scheme envisages
‘education’ in a holistic perspective and as a continuum from Pre-school, Primary, Upper Primary,
Secondary to Senior Secondary levels. The Scheme would, therefore, attempt to provide, as far as
possible, an integrated/composite school system from pre- school to Senior Secondary level.
This will facilitate the transition of children across various levels of school education and will aid
in promoting children to complete school education. Another important aspect of approach that
would guide the entire gamut of activities and interventions under the scheme and particularly with
regard to provisioning of schooling facilities is focus on Disadvantaged Groups of Children.
2.2.2 Ensure Equity: Equity is a critical and cross-cutting theme which will guide all
interventions for universal access under the scheme. Equity will mean not only equal opportunity,
but also creation of conditions in which the disadvantaged sections of the society – children of SC,
ST, Muslim minority, landless agricultural workers and children with special needs, etc. can avail
the opportunity. School access demands addressing all exclusionary practices in the school,
especially those based on caste, religion, gender and special needs etc. Access will not, therefore,
be confined to ensuring that a school becomes accessible to all children within specified distances
but implies an understanding of the educational needs and predicament of the traditionally excluded
categories – the SC, ST and other sections of the most disadvantaged groups, the Muslim minority,
girls in general, and children with special needs. Access will also mean to address the needs and
requirement of other disadvantaged categories of children such as children affected with migration,
urban deprived children, children whose families are involved in stigmatised professions, homeless
children, children without adult protection, children affected with Left Wing Extremism (LWE),
internal strife, transgender, children affected with violence and all other categories who would
require additional support for access to schools and participation therein.
2.2.3 Ensure Availability of Adequate Infrastructure: - Access to school will not be confined
to mere availability of school but it will contain all the provisions that are required to attract and
retain children in school till their completion of education. Provisions such as proper classrooms,
DRAFT DOCUMENT
10
adequate & functional toilets, Drinking water facility, ramps etc. are necessary part of any school
building and need to be provided mandatorily. All school buildings that will be constructed under
the Scheme will have provision of rain water harvesting system and solar panel in the building plan
itself and the school buildings will be designed so as to make them disabled friendly.
2.2.4 Composite/ Integrated School: - The scheme attempts to support the States/UTs in
Universalizing Access to School Education across the country and builds on the gains the country
has already made under the two previous schemes of SSA and RMSA. With a view to facilitate
States/UTs to move towards composite/ integrated schools, the new upper primary schools/sections
will be opened in the campuses of existing primary schools through upgradation of the existing
primary school, so that the upgraded school becomes an integrated elementary school from classes
I to VIII. Similarly, secondary schools shall be opened through upgradation of existing upper
primary schools and senior secondary school through upgradation of secondary school. Hence,
while opening new schools, the priority shall be given to those schools which have adequate space
and other infrastructure to be upgraded to next level of education, besides location in uncovered
areas and having adequate enrolment.
2.2.5 Child tracking through SDMIS: -The Scheme aims to achieve the goal of 100% retention
from pre-school to senior secondary school. It will require tracking of all children. The State/UT
may track these students through the Student Data Management Information System (SDMIS). The
SDMIS is a longitudinal database, envisaged to track the schooling status of around 260 million
students throughout the school education stage and provide critical evidence for policy and
programme planning. This system will collect student wise data from Grade 1 to 12 and develop an
independent student database which can grow as a Child Tracking System in the coming years.
2.2.6 Mapping for Universal Access: - The scheme aims to reach out to all children in the age
group of 4-18 years and has planned provision of schooling facilities as its first objective. States
/UTs would need to arrive at a clear picture of current availability of schools, identify the gaps i.e.,
areas or habitations which are un-served and plan to provide access to school to the identified unserved areas/ habitations according to possible solutions. This will require mapping of all existing
schools and all habitations/ wards etc. Appropriate location provides access to large number of
children and is, therefore, sustainable over the years. The appropriate location can be best identified
in consultation with children and community. Therefore, a comprehensive mapping exercise will
help identify gaps, un-served areas/ habitations and appropriate location where new schools
need to be opened. This School mapping exercise should preferably be carried out using satellite
imagery with the help of Geographical Information System (GIS) technology followed by
Community Based Mapping.
2.2.7 GIS based Mapping is important in order to assess the demand-supply situation as well as
mapping of unreached or under-served areas. It provides basic spatial information such as longitude
and latitude of an existing school, location of nearby school, distance between two schools and
distance from school to habitation etc. It may help the planners in many ways specially identifying
current availability of schooling facility within defined area and map the habitations by linking
them to specific elementary, secondary and senior secondary schools. It will help in mapping of
catchment area of school along with information of the feeder schools. It will also help to ensure
DRAFT DOCUMENT
11
the efficient and equitable distribution of resources within and between school systems and help in
planning a development strategy by sustainable plan for future growth. It is useful not only in
developing of distance matrices but will provide important inputs with respect to courses available
at secondary level and various streams available at senior secondary level. This will also include
assessment of the availability of the facilities for different subjects/ streams such as Science,
Commerce, Vocational, Humanities courses etc; in all the schools located in rural and urban areas.
2.2.8 Community based mapping is a powerful means of mobilising the community to ensure
that all children attend schools and complete all levels of school education from pre-school to class
XII. Hence, The Scheme would also work towards enhancing participation of the community,
parents, teachers and children by involving them in key decisions affecting the education of
children. This will include identification of gaps or un-served areas/ habitations and planning for
providing schooling facilities. This will require a manual mapping involving community and all
other stakeholders. Under the manual mapping exercise, the database of schools and habitations is
created using standard Data Capturing Formats. These formats helps in measuring the correct
distances (walking/ cycling distance by road), which overcome the constraint of the Geo
Informatics System based survey and provides actual distances in place of aerial distances, which
further help to identify the appropriate location for new school.
2.2.9 It is important to note that GIS based mapping and Community based mapping are
not substitute of each other and, therefore, one can not be replaced by the other. Both have
their own benefits and supplement each other. If the results of both forms of mapping are used
collaboratively, it will help determine the changes necessary in schools, and build a dynamic vision
of the education services, including infrastructure, teachers, and equipment, required.
2.3 Pre-School Level
2.3.1 The scheme will support the efforts of State Government/UTs in setting up pre-school
classes in schools. To ensure smooth transition of children from Anganwadi Centre to the formal
school, States and UTs will take steps to locate the Integrated Child Development Services (ICDS)
centres within the primary school complex. Infrastructure available under Anganwadi/ ICDS will be
utilized for Pre-school. Broad norms with detailed mechanism for expansion of pre-school
education will be finalised in consultation with MoWCD.
2.3.2 The Scheme will support States/ UTs in training of Anganwadi workers for pre-school
education in line with the National Council of Educational Research and Training (NCERT)
Framework, co-location of Anganwadis in Primary Schools and curriculum development in
convergence with Ministry/Department of Women and Child Development (MoWCD) and support
to States/ UTs in their efforts to provide pre-school education. Detailed guidelines for pre-school
education are given in the Chapter on Pre-School Education.
2.4 Elementary Level
2.4.1 The RTE Act, 2009 provides a rights-based perspective to the education of children at
elementary level. It provides a justiciable legal framework that entitles all children between the
DRAFT DOCUMENT
12
ages of 6-14 years to an education of reasonable quality, based on principles of equity and nondiscrimination. It provides for children’s right to free and compulsory admission, attendance and
completion of elementary education. More importantly, it provides for the child’s right to education
that is free from fear, stress and anxiety. The RTE Act, 2009 also lays down the responsibilities of
teachers.
2.4.2 The Salient Features of RTE Act 2009:-
(i) Right of children to free and compulsory education till completion of elementary education
in a neighbourhood school.
(ii) ‘Compulsory Education’ means obligation of the appropriate government to provide free
elementary education and ensure compulsory admission, attendance and completion of
elementary education to every child in the six to fourteen age group. ‘Free’ means that no
child shall be liable to pay any kind of fee or charges or expenses which may prevent him or
her from pursuing and completing elementary education.
(iii) Section 6 makes provision for establishment of school for all children within the defined area
or limits of Neighbourhood as defined by the States/UTs.
(iv) It makes provision for a non-admitted or drop out child to be admitted to an age appropriate
class with provision of Special Training in order to be at par with other children.
(v) It specifies the duties and responsibilities of appropriate Governments, local authority and
parents in providing free and compulsory education and sharing of financial and other
responsibilities between the Central and State Governments.
(vi) It lays down the norms and standards relating inter alia to Pupil Teacher Ratios (PTRs),
buildings and infrastructure, school-working days, teacher-working hours etc.
(vii) It provides for rational deployment of teachers by ensuring that the specified pupil teacher
ratio is maintained for each school, rather than just as an average for the State or District or
Block, thus ensuring that there is no urban-rural imbalance in teacher postings. It also
provides for prohibition of deployment of teachers for non-educational work, other than
decennial census, elections to local authority, state legislatures and parliament, and disaster
relief.
(viii) It provides for appointment of appropriately trained teachers, i.e. teachers with the requisite
entry and academic qualifications.
(ix) It prohibits (a) physical punishment and mental harassment; (b) screening procedures for
admission of children; (c) capitation fee; (d) private tuition by teachers and (e) running of
schools without recognition,
(x) It provides for development of curriculum in consonance with the values enshrined in the
Constitution, and which would ensure the all-round development of the child, building on the
child’s knowledge, potentiality and talent and making the child free of fear, trauma and
anxiety through a system of child friendly and child centred learning.
(xi) It provides penalties: (a) For charging capitation fee: fine upto 10 times the capitation fee
charged; (b) For resorting to screening during admission: Rs 25,000 for first contravention;
Rs 50,000 for each subsequent contravention; and (c) For running a school without
recognition: fine upto Rs one lakh, and in case of continuing contravention Rs 10,000 for
each day during which the contravention continues.
DRAFT DOCUMENT
13
(xii) It provides for protection and monitoring of the child’s right to free and compulsory
education and redressal of grievances by constitutionally created independent bodies of the
National and State Commissions for Protection of Child Rights.
(xiii) The Act under Section 19 (1) also stipulates that all schools will fulfil the norms and
standards pertaining to teachers, building, working and instructional hours and resources as
specified in the Schedule of the Act. The Act under Sections 8 & 9 makes it obligatory for
the appropriate Government and Local Authority to ensure Neighbourhood schools as
prescribed under Section 6. Further, the Act places a compulsion on the State to ensure that
no child from the weaker sections or disadvantaged groups is discriminated against in any
manner or prevented from pursuing and completing elementary education.
2.4.3 Access to elementary school shall continue to be as per Section 6 and 38 (2)(b) of the RTE
Act, which provides:-.
Section 6: ‘The appropriate governments and local authorities shall establish, within the
area or limits of a neighbourhood, a school, where it is not already established, within a
period of three years from the commencement of the Act’.
Section 38: (1) The appropriate Government may, by notification, make rules, for
carrying out the provisions of this act.
 (2) In particular, and without prejudice to the generality of the foregoing powers, such
rules may provide for all or any of the following matters, namely:-
b) the area or limits for establishment of a neighbourhood school under section 6;
2.4.4 Accordingly, the State/UTs as the ‘appropriate Government’ have the power to notify
the neighbourhood norms in their State/UT RTE Rules as per their specific requirements.
The new primary and upper primary schools will be provided as per the defined area or
limits of the neighbourhood notified by the State/UT Government under the State/UT RTE
Rules.
2.4.5 In pursuance to Section 6 of the RTE Act, 2009, the Central Government has notified the
area or limits of neighbourhood, applicable only for UTs without Legislature, within which a
school has to be established by the appropriate Government or the local authority. Central Rules
provide
 Primary schools: - In respect of children in classes I to V, a school shall be established
within a walking distance of one kilometre of the neighbourhood.
 Upper Primary schools: - In respect of children in classes VI to VIII a school shall be
established within a walking distance of three kilometer of the neighbourhood.
2.4.6 The central RTE Rules also make provision for relaxation of norms in places with difficult
terrain where there may be risk of landslides, floods, lack of roads and in general, danger for young
children in the approach from their homes to the school. In the case of children with disabilities, the
Central RTE Rules provide for appropriate and safe transportation arrangements to enable them to
attend school and complete elementary education.
DRAFT DOCUMENT
14
2.4.7 Provision of access to schools, complying with Norms and Standards as provided in the
Schedule, on universal basis at elementary level will be priority of the Scheme. In order to ensure
access to school of all children at elementary level within walk-able distance, SSA has provided
large number of schools during 17 years of its implementation. Preference for opening of school
was given to tribal/ difficult areas and areas with high concentration of SC and ST population.
Consequently, there has been a huge expansion of schooling facilities at elementary level across the
country and the country has achieved near universal access. States and UTs have also started
consolidating/ merging of schools with very low enrolment. It is underlined that
consolidation/merger of school will not in any case violate the right of access to school of a
single child as per neighbourhood norms. The detailed guideline on rationalization of small
schools has already been shared with the States/UTs8
.
2.4.8 With a view to facilitating States/UTs to move towards a composite structure of schools, as
far as possible, the scheme provides that new upper primary sections shall be provided, wherever
required preferably through upgradation of existing primary schools so that school becomes an
integrated elementary school from classes I to VIII.
2.4.9 Assistance for Recurring Expenditure including manpower deployment in New Upper
Primary Schools would be as prescribed in norms subject to provision of teachers, infrastructure,
TLE and facilities as mandated under the RTE Act, 2009 including, a) At least one teacher per class
so that there shall be at least one teacher each for (i) Science and Mathematics; (ii) Social Studies
(iii) Languages. Additional teachers need to be provided as per the enrolment in each school; b)
Building as per infrastructure norms prescribed under the RTE Act, preferably in the campuses of
existing primary schools.
2.4.10 Section 12 of RTE Act 2009 mandates that (a) all Government and local body schools
shall provide free and compulsory education to all children enrolled therein, (b) all aided schools
receiving aid or grants to meet whole or part of its expenses shall provide free and compulsory
education to such proportion of children as its annual recurring aid or grants, subject to a minimum
of 25%, and (c) all unaided and ‘specified category’ schools, namely Kendriya Vidyalaya,
Navodaya Vidyalaya, Sainik schools or any other school having a distinct character as specified by
notification by the State Government/UT, shall provide free and compulsory education to at least
25% children belonging to weaker sections and disadvantaged groups in the neighbourhood.9
2.4.11 While determining the need for access of children to neighbourhood schools, the mapping
exercise should factor in the availability of seats for children from disadvantaged groups and
weaker sections not only in government and local body schools, but also in aided, unaided and
special category schools as provided under the RTE Act.
2.4.12 Section 12(2) of RTE Act also provides for reimbursement to the Private Unaided Schools
for admitting children under Section 12(1)(c). The reimbursement will be based on the per-child

8
 Available at http://mhrd.gov.in/sites/upload_files/mhrd/files/Guidelines%20for%20Rationalization.pdf
9Guidelines regarding procedure for 25% admission of children belonging to weaker section and disadvantaged groups
from the neighborhood under section 12 (1) (c) and 13 (1) of the RTE act issued vide notification dated 23rd November
2010 may be seen at http://mhrd.gov.in/sites/upload_files/mhrd/files/upload_document/RTE_2.pdf.
DRAFT DOCUMENT
15
expenditure incurred by the State or the actual amount charged by the school from other children,
whichever is less. The reimbursement towards expenditure incurred for 25% admissions in private
unaided schools under Section 12(1) (c) of the RTE Act would be supported under the Scheme. The
reimbursement under the Scheme will be based on per child norms notified by the States / UT
concerned for classes I to VIII, subject to a maximum ceiling of 20% of the total Annual Work Plan
and Budget approved by the Government of India for a State/UT under the Scheme.
2.4.13 The reimbursement for this purpose would be provided based on the proof of actual
payment made to schools by the States. Further, a robust monitoring mechanism needs to be
developed by the States to monitor the admission of eligible children from class I to VIII and the
reimbursement process in a transparent manner. In this context, appraisal will be carried out based
on the data provided by the State for such children under SDMIS.
2.4.14 The Scheme also provides for children’s access to elementary schools through Transport
and Escort facility to children in Classes I-VIII and for Children with Special Needs (CWSN).
Children in remote habitations with sparse populations or in urban areas where availability of land
is a problem or children belonging to extremely deprived groups or CWSN may not find access to
schools. Such children may be provided support for transportation or escort facilities. This may be
provided based on receipt/appraisal of district/block specific proposals from the State, justifying the
need for providing transportation / escort facility to children in sparsely populated, hilly/densely
forested/desert terrains, as well as urban areas where non-availability of land makes it unviable to
set up schools as per the ‘neighbourhood’ norms of the State. The Provision for transport/escort
facility will be made as an ‘exception’ measure only which will be provided in exceptional
circumstances as per proposals presented by the State justifying the need and reasons for not
opening a regular school. This will also be linked to the rationalization of small schools by the
state. To avail this facility, State must notify the area/limits of neighbourhood in which
transport/escort facility is to be provided to the specified categories of the children.
2.4.15 Transport facility to children in classes I-VIII from sparsely populated areas and urban areas
where schools is not available or Urban Deprived Children may be provided up to the given norms
based on actual cost to be incurred as per the distance, the terrain and the type of transport facility
to be provided.
2.4.16 There are certain areas in the country where it may not be viable to set up schools. The
Scheme would support the provision of residential facilities for boys and girls to serve children in
sparsely populated areas of tribal, desert or hilly and densely forested districts, where it may not be
viable to set up separate full-fledged schools. There are also densely populated urban areas, where
it is difficult to get land for establishing schools. Also, in urban areas, there are a number of
deprived children: homeless and street children in difficult circumstances, without adult protection,
who require not merely day-schooling facilities, but also lodging and boarding facilities.
Residential facilities may be provided for these children under the Scheme. However, there may be
an inherent difficulty in locating such schools all over the country; the establishment of residential
schools should therefore be restricted, as an ‘exception’ to sparsely populated, hilly/forested
terrains and for urban deprived children such as street children and children without adult
protection etc.
DRAFT DOCUMENT
16
2.4.17 The Scheme would support the provision of residential facilities which may be in the form
of (1) Establishing Hostel in the premises of an existing primary/upper primary school, or (2)
Opening a residential school where primary/upper primary school does not exist. Approval under
the Scheme for such facilities is, however, contingent on States conducting a school mapping to
ensure that there is no school in the area and transportation facility to and fro from the school
nearest to the neighbourhood is not practical and identification of all children who would benefit
from such intervention.
2.4.18 Children on the streets may suffer from many denials and vulnerabilities: these include
deprivation of responsible adult protection, coercion to work to eat each day, work in unhealthy
occupations like rag-picking, begging and sex work, abysmally poor sanitary conditions,
inadequate nutrition, a range of psycho-social stresses, physical & sexual exploitation, and
exposure to substance abuse. For urban deprived and children without adult protection,
Scheme will provide support for residential facilities as per the following interventions:
2.4.18.1 Redeploying public buildings and infrastructure: -Lack of buildings because of the high
cost of real estate in cities is the severest bottle-neck to providing facilities for urban deprived,
vulnerable children. The Government can at best fund a few ‘model’ hostels, but this would not
cover the thousands of street children in every city. Most State and local governments have large
unused and under-utilised buildings and infrastructure, which need to be redeployed and shared with
street children. The best and most economical approach, and one that has the potential to reach every
street child, is to share spaces in existing schools that are vacant. Such buildings may need only
small additions for toilets, bathing places and a kitchen. Such an approach also has the potential to
lead to integration, dignity and the learning hands-on of egalitarian compassion and pluralism.
A case study of Andhra Pradesh
In Andhra Pradesh, some residential schools for children without adult protection have been set
up as part of existing schools in Hyderabad. This has been found to have many advantages: not
only low costs, but the integration of children with families and homes with those who have
been deprived, to the great pedagogic advantage of both. Many government schools also
welcomed this, because it has pushed up the enrolment in the schools, and made them more
viable.
2.4.18.2 Refurbishing unused old buildings: The sharing of existing schools should be the
preferred model. But it is also possible to secondarily rely on refurbishing unused old buildings,
with additions and alterations. The State and municipal governments have many buildings that are
unused and under-used which can be allotted and upgraded as residential homes. These can be old
school buildings, or other municipal or other departmental buildings. Ideally these residential
schools should also be developed as regular primary/ upper primary schools, so they approximate
the first model over a period of time.
2.4.18.3 New residential building: The last option would be the construction of new residential
facilities for children without adult protection and other vulnerable groups, in which case the norms
pertaining to Kasturba Gandhi Balika Vidyalayas (KGBVs) would apply. Detailed financial norms
DRAFT DOCUMENT
17
are given in Chapter on Gender and Equity in School Education.
2.4.18.4 Thus, the Scheme will provide support for (i) addition of spaces such as toilets, bathing
spaces, kitchens in existing schools proposed to be used as residential facilities for street children
without adult protection, (ii) refurbishing of unused buildings for use as residential facilities for
street children without adult protection, and (iii) construction of residential facilities to serve
children in remote, sparsely populated areas, including tribal, desert and hilly areas and street
children without adult protection in urban areas. The design of all the three types of buildings should
be inclusive to serve children with disabilities as well. Addition of spaces in under-utilised existing
schools or refurbishing of unused existing schools would be examined on a case to case basis.
2.4.19 For the Residential schools/ Hostels, which are set up under this scheme, assistance for
Recurring Expenditure including manpower cost based on KGBVs/Girls Hostel norms has been
provisioned. For detailed financial norm refer the chapter on ‘Gender and Equity’.
2.4.20 There are 942 residential schools/hostels in the country, which were sanctioned under SSA.
The scheme will continue to support these existing 942 residential schools as well as strengthen its
facilities to safely accommodate and to promote access and retention. The assessment for
strengthening of these residential facilities will be based on the progress of the existing facility
along with the need established through micro planning, community consultation etc. The gap
assessment of infrastructure for strengthening of all existing residential schools/ hostels may be
carried out through UDISE and School Development Plan (SDP).
2.5 Secondary & Senior Secondary Level
2.5.1 The scheme is committed to provide universal access to quality education at secondary and
senior secondary stage. With a view to facilitating States/UTs, the Scheme provides support to
establishment of new schools by up-gradation of upper primary school to secondary schools and
up-gradation of Secondary Schools to Senior Secondary Schools and thus for establishment of
composite schools. The scheme also supports for strengthening existing schools. The first priority
would be strengthening of existing schools, then, provision of additional sections in the existing
schools and then upgradation of existing upper primary to secondary as well as secondary to senior
secondary school. Opening of new standalone schools should be the last priority which should be
done as an exceptional measure only in un-served areas.
2.5.2 For providing universal access to quality secondary education, the neighbourhood norms
notified by the state/UT would be applicable for opening of new secondary and senior secondary
schools. In the case of the States and Union Territories, which have not notified the neighbourhood
norms for secondary and senior secondary Schools, the scheme will provide support for access to
secondary school within a distance of 5 Km and Senior Secondary school within 7-10 Km of a
habitation while ensuring their viability (i.e. ensuring adequate numbers of students’ enrolment)
and cost effectiveness. It is also imperative that broad norms are indicated at the national level and
provision may be made for each State/UT keeping in mind the geographical, socio-cultural,
linguistic and demographic condition of not just the State/UT but also, wherever necessary, of the
locality. The States/UTs will identify requirement of new secondary and senior secondary schools
DRAFT DOCUMENT
18
through upgradation on the basis of school level micro planning. Every district plan should be
based on school and habitation mapping through micro planning exercise. Evidence of the micro
planning and school mapping exercise should also be available in the District Plans which will be
consolidated into State Plans.
2.5.3 The new/upgraded secondary and senior secondary schools will be opened on the basis of
the Perspective Plan and demand worked out through micro planning by the State Governments for
opening of new and viable schools, especially in deficient or un-served areas. In the secondary
level, preferably two sections each for classes IX to X would be provided.
2.5.4 For a Senior Secondary School to be viable in terms of teachers and other facilities, it is
desirable to have two sections for each stream, i.e. Science, Arts & Commerce. A school that offers
a single stream of study, the total number of students in Grade XI would be 80 (40 students per
section) and a maximum of 80 students in Grade XII. Thus, the maximum number of students in a
school offering a single stream of study would be160. In a school that offers two streams of study,
the total number of students in Grade XI would be 160 (four sections) and a maximum of 160
students in Grade XII. In a school that offers three streams of study, the total number of students in
Grade XI would be 240 (eight sections) and a maximum of 480 students in Grade XII if all students
enrolled in Grade XI move to Grade XII.
2.5.5 Opening of new Senior Secondary and Secondary sections/ schools, or up gradation of
upper primary schools to secondary /Senior Secondary level would include provision of additional
class rooms with furniture, library, laboratories, vocational lab, computer room, Head Master room,
Art and Craft room, drinking water facility, separate toilets with water facility for boys, girls and
CWSN. All these schools will have provision for rain harvesting system, solar panel etc; in the
building plan itself. All school buildings will be so designed as to make them disabled friendly.
2.5.6 The Scheme also provides for, 4 class rooms for 2 section school / 2 class rooms for 1
section school for Secondary level & 4 class rooms for 02 section school/ 2 class rooms for 01
section school for Senior Secondary level for each stream i.e. Science, Arts and Commerce. The
scheme also provides 1 integrated Science Laboratory for Secondary School and 4 laboratories for
Physics, Chemistry, Biology and Mathematics for Senior Secondary Schools having science
streams.
2.5.7 For the new/upgraded secondary/senior secondary schools, which are set up under this
scheme, a lump sum recurring assistance has been provisioned up to the limits given in the norms
given in Appendix. The recurring assistance will include manpower deployment in new
secondary/senior secondary schools. All upgraded/new secondary/secondary schools should be
provided subject wise teachers for all the core subjects, support for arts & crafts, sports & physical
education and co-curricular activities.
2.5.8 The scheme would also support strengthening of existing secondary and senior
secondary schools. While planning for strengthening of existing secondary and Senior Secondary
schools, the gap assessment exercise for all the schools may be carried out through UDISE data and
school mapping exercise followed by School Development plan. Since the gap would be huge
DRAFT DOCUMENT
19
which cannot be addressed in a single year, it is necessary that long term perspective plan be
prepared keeping in view the expected enrolment. The additional sections/streams in the schools
may also be opened on the basis of demand and requirements. In this regard, the district/ state
teams will have to work out a staggered plan on certain defined prioritization criteria.
2.5.9 The scheme would also support residential facilities to serve children (boys and girls)
from sparsely populated areas, where it may not be viable to set up a full-fledged school. The
provision of residential facilities would be supported in the form of hostel in the premises of an
existing secondary and Senior Secondary school or a residential school where secondary and Senior
Secondary school does not exist. Approval under the Scheme for such facilities is however
contingent on States conducting a school mapping to ensure that there is no school in the area and
transportation facility to and fro the school nearest to the neighbourhood is not practical, and
identification of all children who would benefit from such intervention.
2.5.10 For the Residential schools/ Hostels, which are set up under this scheme, assistance for
Recurring Expenditure including manpower cost would be based on KGBVs/Girls Hostel norms.
 [B] INFRASTRUCTURE DEVELOPMENT
2.6 The Integrated Scheme on School Education aims to achieve universal access of children in
schools from Pre-School to Senior Secondary in an inclusive and equitable manner, focusing on
quality of education with improved infrastructure in the schools. The States and UTs are required to
bring a single plan for entire school education sector integrating the existing Centrally Sponsored
Schemes of SSA, RMSA and TE for interventions relating to infrastructure development.
2.7 The Scheme will be governed and regulated by the provision of the RTE Act, 2009 for
elementary schools. The Schedule to RTE Act lays down the norms and standards for a school and
provides that a school with an all weather building should consist of the following:
i) At least one class-room for every teacher;
ii) An office-cum-store-cum-HM room;
iii) Barrier-free-access;
iv) Separate toilets for boys and girls;
v) Safe and adequate drinking water facility to all children;
vi) A kitchen where mid-day meal is cooked in the school;
vii) Playground;
viii) Arrangements for securing the school building by boundary wall or green fencing
ix) Library: A library in each school providing newspapers, magazines and books on all
subjects, including story books.
x) Play material, games and sports equipment.
2.8 The RTE Act also lays down that the appropriate government and local authority defined in
the Act shall ensure availability of a neighborhood school and shall have the duty to provide
infrastructure including school building and ensure good quality elementary education conforming
to the standards and norms specified in the schedule. The support for creation of school
DRAFT DOCUMENT
20
infrastructure under the scheme will be through direct programme funding and also in convergence
with other schemes of the Central and State Governments.
2.9 Preference for various interventions will be given to Educationally Backward Blocks
(EBBs), LWE affected districts, Special Focus Districts (SFDs) and the 115 Aspirational Districts.
Further, 50% of the proposed physical targets including new schools, Strengthening, ICT in Schools
& Vocational Education will be focused for North Eastern States, LWE affected Districts, Island
territories and other backward areas.
2.10 The school infrastructure under the scheme has been conceptualized with the overall
developmental goal of raising the performance of the school education sector following a strategy
of supporting interventions for school effectiveness and sustainable institutional capacity. The
Scheme envisages the ‘school’ as a continuum from primary, upper primary, secondary to Senior
Secondary levels. This will smoothen the transition rates across the various levels of school
education and aid in promoting universal access to children to complete school education. Also, it
will aid in optimum utilisation and sharing of school infrastructure and other resources.
2.11 The major school infrastructure components under the scheme are:
2.11.1 Opening of new schools which would include new primary schools, upgradation of primary
school to upper primary schools, up-gradation of upper primary school to secondary schools and
up-gradation of secondary schools to Senior Secondary schools. The upgradation /strengthening
includes provision for construction of additional class rooms, library, laboratory, computer room,
art/craft/ culture room, Laboratory / Workshop for vocational education, separate toilets for boys ,
girls and CWSN, safe drinking water, electrification, kitchen shed, ramps, furniture, laboratory
equipments, Head Master room, office/ common room, Building as Learning Aid (BALA),
playground, boundary wall / fencing, etc, as per requirement based on availability, adequacy and
functionality of existing infrastructure.
2.11.2 Major and minor repair of existing school infrastructure. Schools constructed within the past
10 years will not be considered for major repairs. Also, the cost of repairs to be undertaken should
not exceed 60% of the cost of a new construction. Repairs to dysfunctional toilets and drinking
water facilities will form a part of this component. Pre-repair and post repair photograph need to be
maintained and also uploaded online
2.11.3 Residential quarters for teachers, especially female teachers in sparsely populated or hilly
and densely forested areas with difficult geographical terrain and border areas where a new primary
or upper primary and secondary/Senior Secondary schools may not be viable. Preference will be
given to EBBs, LWE affected districts, SFDs and the 115 inspirational districts.
2.11.4 Construction of new DIETs/Block Resource Centre (BRC)/Cluster Resource Centre (CRC)
buildings & strengthening of existing DIET/BRC/CRC buildings as per norms.
2.11.5 Construction / upgradation of Kasturba Gandhi Balika Vidyalaya (KGBV) buildings.
DRAFT DOCUMENT
21
2.12 Construction Standards for School Buildings
2.12.1 The National Building Code (NBC) 201610, developed by the Bureau of Indian Standards
(BIS) provides guidelines for regulating building construction activities across the country. It serves
as a model code for adoption by all agencies involved in building construction works. The code
should serve as a reference for all States and UTs, for design, planning, preparation and execution
of school infrastructure components. This requirement does not preclude the use of local
construction design, materials and practices. The relevant BIS codes as amended from time to time
are given below.
S.No Code Functional area
1 IS 1893 (part-1-2002) Criteria for earthquake resistant design of structure
2 IS 4326-1993 Practice for earthquake resistant design and construction
building
3 IS 13828-1993 Guidelines for improving earthquake resistant of low
strength masonry buildings
4 IS 13920-1993 Ductile detailing of reinforced concrete structure subject
to seismic forces.
5 IS-456-2000 Structural design of buildings.
6 IS-14435-1997 Code of practice of fire safety is educational institutions.
7 IS-2440-1975 Guide for day lighting of building
8 IS 4963 -1987 Recommendation of building and facilities for
physically handicapped.
9 IS 7662 (part 1) 1974 Recommendation of orientation of buildings
10 IS 4837-1990 School furniture, classroom chair and tables
recommendation
11 IS 4838-1990 Anthropometrics dimensions for school children age
group 5-17 years.
12 IS 8827- 1978 Recommendation for basic requirements of school
buildings
13 Energy Conservation
Building Code
(ECBC) 2007
For energy conservation in buildings
2.12.2 While executing infrastructure components, States and UTs shall comply with statutory
orders for implementing the Guidelines on School Safety Policy, February 2016 prepared by
National Disaster Management Authority (NDMA)11. The school building has to ensure easy
access to all children and teachers by providing facilities such as gender segregated toilets, CWSN
toilets, safe drinking water, ramps, handrails, etc. The classroom design must ensure natural light,
ventilation, seating, display, storage and environment friendly features. Girls’ toilets should include
environmentally safe incinerators. For providing barrier free access, it has to be ensured that the
provisions contained in the “Harmonized Guidelines and Space Standards for Barrier Free Built
Environment for Persons with Disability and Elderly Persons” February, 201612 issued by Ministry
of Urban Development, Governmentt. of India are complied with.

10 http://bis.org.in/sf/nbc.asp
11Available at http://www.ndma.gov.in/images/guidelines/School-Safety-Policy.pdf
12 Available at http://cpwd.gov.in/Publication/Harmonisedguidelinesdreleasedon23rdMarch2016.pdf
DRAFT DOCUMENT
22
2.12.3 The electrification components under new construction / upgradation of schools, residential
schools, hostels etc. includes Renewable energy like Wind Energy, Solar Energy etc. based on the
proposal of the State after seeing the viability. For installation of on-grid and off-grid roof top solar
installations, the area norms and financial norms as prescribed by Ministry of New & Renewable
Energy (MNRE) is to be followed. The same shall be implemented in convergence with MNRE.
The indicative technical specification and design are as below.
Types of Solar PV Systems:-
1- OFF Grid / Stand alone/ Battery backup
2- On Grid
3- Hybrid – SPV+ (wind/ biomass/ hydrogen/ DG )
Types of Solar Panels:-
1- Mono crystalline
2- Polycrystalline/ Multi crystalline
3- Thin films (HIT)
Indicative Area (Space) required for setting up solar PV system in the school is given
below: -
Size ON grid/ OFF grid (sqm)
1 kWp 10 - 12
5 kWp 50 – 60
2.12.4 Development of school infrastructure is a holistic exercise of developing the school building
along with its indoor and outdoor spaces to promote universal access, retention, equity and quality
in education. School infrastructure will have to be well thought-out physical learning environments
and seen as integrated systems. The design will need to address various aspects of the educational
vision of the school. A master plan and base document for school educational and infrastructure
work along with its development in phases needs to be developed. Its planning is seen as an
evolving process rather than one time activity.
2.12.5 In planning and design of schools and also in construction, it should be ensured that
measures to strengthen the environment, health and safety practices are included in accordance with
the guidelines contained in ‘Environmental Management Framework for Secondary Schools’ issued
by MHRD and School Safety Policy Guidelines, February, 2016 issued by NDMA.
2.13 Preparation of Proposal and Specifications
The scheme provides for preparation of estimates of Civil Works on the basis of State
Schedule of Rates (SSOR) or CPWD rates whichever is lower. While preparing the plan and
estimates, element of pooling in of resources through convergence, community participation, CSR
funding etc. should be factored in to the maximum extent possible.
DRAFT DOCUMENT
23
2.14 Execution of Civil Works
Construction activities are to be undertaken with community involvement. Planning and
implementation by the community through School Management Committee (SMC)/ School
Management and Development Committee (SMDC) in all infrastructure development activities will
be mandatory. All works costing up to Rs.30 lakh will be executed preferably by SMC/SMDC.
2.15 External services such as approach road, sewerage, external electrical connections, external
water supply connection, drainage etc. shall be provided by the States /UTs.
2.16 Civil Work costs shall include:
i. Construction of school building conforming to RTE Norms.
ii. Eco-friendly construction for all school buildings
iii. The buildings will be designed as per NBC, 2016 and structure shall be earthquake resilient
and will be fitted with basic fire safety equipments and in compliance with NDMA
guidelines on school safety.
iv. Adaptation of existing building environment to conform to RTE norms.
v. Retro-fitting of existing building toward hazard resistance.
vi. Construction of building-less schools.
vii. Reconstruction of dilapidated school buildings which are beyond major repairs and declared
unsafe by the competent engineers.
viii. Reconstruction of dysfunctional toilets and safe drinking water facilities.
ix. Infrastructural interventions required to be undertaken under Swachh Vidyalaya .
x. Spill over of civil works sanctioned in erstwhile subsumed schemes.
2.17 Composite School Grant
2.17.1 The Scheme envisages an annual recurring school composite grant for all Government
Schools for the replacement of non-functional school equipment and for incurring other recurring
costs such as consumables for play materials, sports equipment, laboratories, electricity charges,
internet, water, teaching aids etc. It also provides for annual maintenance and repair of existing
school building, toilets and other facilities to upkeep the infrastructure in good condition. The grant
is also to be used for promoting Swachh Bharat Campaign.
2.17.1.1 The scheme prescribes that the composite school grant must involve elements of
community contribution.
2.17.1.2 The amount of grant varies from Rs. 25,000 to Rs. 1,00,000 per annum depending upon
the number of students in the school. Further, for very small schools with enrolment of less than 30
students, these will be accordingly scaled down.
2.17.1.3 A minimum of 10% of the grant should be used for activities related to Swachhta Action
Plan (SAP) namely, undertaking maintenance of school facilities including toilets, safe drinking
water and for improvement in Water, Sanitation and Hygiene (WASH) infrastructure, Hand
washing with Soap, Operations and Maintenance, Behavior Change Activities and Capacity
DRAFT DOCUMENT
24
Building etc. As per directions of the Ministry of Finance, a separate budget head is maintained in
MHRD for release of funds under SAP.
2.17.1.4 SAP should be based on credible analysis of existing situation, gap assessment and
prioritization of intervention for better outcomes. Swachh Vidyalaya Puraskar (SVP) programme
could form the basis for developing SAP. Based on the gap assessment through SVP scores, priority
interventions shall be identified and resources shall be deployed to bridge the gap with the objective
of every school participating in the SVP and progressing towards achieving the five star ratings as
per the SVP indicators.
2.17.1.5 MHRD has instituted SVP in 2016 to recognize and celebrate excellence in water,
sanitation and hygiene in schools. The main objective is to help schools to identify the areas of
improvement in WASH infrastructure and processes categorized under five sub categories: Water,
Sanitation, Hand washing with Soap, Operations and Maintenance, Behavior Change Activities and
Capacity Building. The explicit purpose of the award is to honour schools that have undertaken
significant steps towards fulfilling the mandate of the Swachh Vidyalaya Campaign. SVP intends
to identify and award schools in rural and urban areas for excellence in the areas of water, toilet,
hand washing with soap, operation and maintenance, and behaviour change and capacity building.
There is a specified methodology for selection of schools for the SVP awards. As per the SVP
guidelines awards are given to schools at District, State and National Level. This aims to promote
schools in achieving a Swacchata Scale and standard for which a Standard Operating Procedure
(SOP) has also been released by MHRD. The detailed SVP guidelines and the SOP are available at
www.swachhvidyalya.com.
2.18 Framework Norms
2.18.1 Framework norms for interventions for infrastructure development and maintenance for
schools under Samagra Shiksha are appended as Annexure-I. The requirements of infrastructure
for SCERTs and DIETs may be referred in chapter VI on Teacher Education. The following
construction norms and standards are available in public domain;
(i) BIS code 8827-1978, (Reaffirmed in 2006) Recommendations for basic
requirements of school buildings,
(ii) NCERT specifications for Integrated labs for secondary schools,
(iii) NCERT prescribed subject wise lab kits for Senior Secondary schools,
(iv) School Safety Policy Guidelines issued by NDMA February, 2016.
(v) Harmonized Guidelines and Space Standards for Barrier Free Built Environment for Persons
with Disability and Elderly Persons” February, 2016 issued by Ministry of Urban
Development, Govt. of India.
(vi) Environmental Management Framework for Secondary School in India, by MHRD
[C] Retention.
2.19 The scheme recognizes the need for special efforts for the retention of children. It also
ensures students participation and completion of schooling cycle. The retention of children assumes
DRAFT DOCUMENT
25
greater significance in the wake of RTE Act which stipulates elementary education as a
fundamental right of all children. In stating thus, the RTE Act opens up the whole sphere of
circumstances which come in the way of a child’s enrolment and participation in school, and his/her
completion of the elementary stage. Similarly, there is a need for special efforts to retain the
children, especially girls and children from disadvantaged sections, to school upto secondary level.
This necessitates an attempt at listing of categories of children who might be at risk of completing
their education and provisions available to ensure their participation and completion.
2.20 Provision of schooling facilities on universal basis essentially demands participation and
retention of children. School access is not merely physical access within a notified distance, but also
participation and retention of children. However, mere provision of schooling facility is insufficient
to ensure that all children attend school and participate in the learning process. The school may be
there, but children may not attend; they may drop out after a few months; or may be absent too
many days and cannot cope with the learning load. Hence, the scheme recognizes the need for
special efforts to bring these children to school, especially girls and children from disadvantaged
sections. This would require a proper identification of children who are out of school in the course
of micro-planning. It also calls for involving women, SC/ST, OBC and Minorities through
participatory processes in the effective management of schools. Special interventions should be
designed to address learning needs of children from these communities and relating education to
their life. The State Governments are expected to design specific interventions to bring them in the
Educational Process.
2.21 Special Training for out-of-school children at elementary level
2.21.1 The RTE Act, 2009 stipulates age appropriate enrolment of out of school children and
provisioning of Special Training for such children so that they can be at par with other children.
Section-4 of the Act stipulates “Where a child above six years of age has not been admitted
in any school or though admitted, could not complete his or her elementary education, then,
he or she shall be admitted in a class appropriate to his or her age;
Provided that where a child is directly admitted in a class appropriate to his or her age, then,
he or she shall, in order to be at par with others, have a right to receive special training, in
such manner, and within such time-limits, as may be prescribed;
Provided further that a child so admitted to elementary education shall be entitled to free
education till completion of elementary education even after fourteen years.”
2.21.2 The Act, under Section 4 makes a specific provision for special training for age appropriate
admission of out of school children. A majority of out-of-school children belong to disadvantaged
communities: Scheduled Castes, Scheduled Tribes, Muslims, migrants, children with special needs,
urban deprived children, working children, children in other difficult circumstances, for example,
those living in difficult terrain, children from displaced families, and areas affected by civil strife,
etc need Special Training. The Special Training will also focus on education of children affected by
migration, Urban Deprived Children, Children in areas affected by civil strife, homeless children,
DRAFT DOCUMENT
26
children without adult protection etc. Special Training can be imparted in both residential and non
residential mode.
2.21.3 Special Training for never enrolled children or those who dropped out before completing
elementary education would require identification of children who must be enrolled in
neighbourhood schools. For this the State Government, Local Authority and SMC will need to
undertake a community level school mapping exercise. The neighbourhood and school mapping
exercise will be followed by (i) immediate enrolment in school (ii) organisation of Special Training
of flexible duration to enable the child to be at par with other children, (iii) actual admission of the
child in the age-appropriate class on completion of Special Training, and his/her participation in all
class activities, (iv) continued support to the child, once admitted to the regular school, so that the
child can integrate with the class socially, emotionally and academically. The RTE Act also
provides that such children shall continue to be provided free and compulsory elementary education
even after they cross 14 years of age.
2.21.4 Special Training may be in the form of residential or non-residential courses organised,
preferably in the premises of the school, but if such facilities are not available in school, alternate
facilities which are safe, secure and accessible may be identified and used. At the end of the
duration of Special Training for a particular child, the suitability of placing the child in a class may
be reviewed. For example, if a 10-year old child was admitted to Class IV, and received two years
of Special Training till age 12, an assessment may be made as to whether the child could cope
better in Class V or VI in the formal school, and the child appropriately placed. Even after a child is
appropriately placed in the formal school she may continue to receive special attention by the
teacher to enable her to successfully integrate with the rest of the class, academically and
emotionally. The scheme will provide support for Special Training as envisaged under the RTE Act
for out-of-school children who have been admitted to regular schools to ensure that they are
integrated into the school system. Such support will be in the form of residential or non-residential
courses, as needed and such children will continue even beyond 14 years of age to complete
elementary education.
2.21.5 Special Training shall be based on especially designed, age appropriate learning material,
approved by the academic authority as per the RTE Act, 2009. It shall be provided by a teacher
working in the school, or a specially engaged teacher. These teachers will be provided additional
training in order to conduct Special Training for out-of-school children. Special Training shall be
provided in classes held on the premises of the school, or through classes organized in safe
residential facilities as specified in the RTE Act, 2009. The duration of Special Training shall be for
a minimum period of three months which may be extended, based on a periodical evaluation of
learning progress, for a maximum period not exceeding two years. Considering the enormity and
complexities of the work involved in Special Training all agencies which have the willingness and
the ability to undertake this work must be encouraged to do so.
2.21.6 For Special Training to never enrolled children or those who dropped out before completing
elementary education assistance for Recurring Expenditure has been provisioned under the Scheme.
Item-wise costs for Recurring expenditure would be worked out to provide adequate flexibility for
DRAFT DOCUMENT
27
the needs of different kinds of children, and approved by the State Executive Committee within the
overall ceiling.
2.21.7 The assistance for special training under the Scheme will be linked to assessment of the
success achieved in mainstreaming children who have undergone special training, based on SDMIS
data.
2.22 School Uniforms
2.22.1 The RTE Act mandates free and compulsory education for all children in Government
schools. Uniforms constitute an expense which poor families are often not able to afford, and thus
becomes a barrier for many children to pursue and complete elementary education. The Scheme
will provide two sets of uniform to all girls, SC, ST children and Below Poverty Line (BPL)
children at an average cost of Rs. 600/- per child per annum, wherever State Governments have
incorporated provision of school uniforms as a child entitlement in their State RTE Rules. These
will be appraised based on the data provided by the State for such children under SDMIS.
2.22.2 The purpose of school uniforms is to inspire a sense of belonging and ownership of the
school for the children using its services. It is not to instil a sense of regimented, homogenized
order. Therefore, decisions on design of uniforms and their procurement should be local rather than
centralized. For this purpose the option of Cash transfer will be allowed as per the existing
guidelines of DBT to Aadhaar linked bank accounts. Further, to monitor the timely distribution of
uniforms in a transparent manner to the eligible children, a robust monitoring mechanism need to
be developed by the States. In this context, States/UTs must ensure timely distribution of uniforms
and proper utilisation of funds provided for this purpose.
2.23 Swachh Vidyalaya Initiative
2.23.1 The provision of water, sanitation and hygiene facilities in school secures a healthy school
environment. Girls are particularly vulnerable to dropping out of school, partly because many are
reluctant to continue their education when toilets and washing facilities are private, not safe or
simply not available/ functional. The Government of India, therefore, launched the Swachh
Vidyalaya Initiative in collaboration with State/UT governments, public sector undertakings and
private corporate for provision of separate toilets for girls and boys in all government schools.
Under this initiative, 4.17 lakh toilets including 1.91 lakh girls’ toilets were constructed/made
functional in 2.61 lakh government schools in one year period upto 15th August, 2015. One of the
most unique features of the Swachh Vidyalaya was the role of the public sector undertakings and
private corporates under the PPP model and online monitoring of progress. The PSUs have been
requested to maintain the toilets constructed by them for at least five years.
2.23.2 Under the Swachh Vidyalaya initiative, State and UT governments have been requested to
keep the toilets functional and take steps to create awareness about the benefits of hand washing,
sanitation and hygiene among school children. State and UT governments have been requested to
take mass Swachhta Pledge and undertake cleanliness activities in schools through various activities
DRAFT DOCUMENT
28
like forming child cabinets, drawing/painting competitions etc. and to inculcate behavioural
changes. During Swachhta Pakhwadas the focus was on sanitation and hygiene in schools.
2.23.3 The Ministry of Panchayati Raj has advised the Panchayati Raj Departments of all States to
include the provision for construction of toilets and drinking water supply systems, filling of gaps in
provision of toilets, rehabilitation and regular repair of existing toilets and drinking water systems
in schools in the Gram Panchayat Development Plans to be prepared converging resources under
the 14th Finance Commission grants, Mahatma Gandhi National Rural Employment Guarantee Act
(MGNREGA) and Swachh Bharat Mission. A joint letter from the Ministry of Drinking Water &
Sanitation, Ministry of Panchayati Raj and Ministry of Human Resource Development, Department
of School Education and Literacy has been addressed to all States and UTs regarding inclusion of
school infrastructure components in the Gram Panchayat Development Plan. Ministry of PRI has
also issued advisory in this regards. The States and UTs also should avail of supplementary funding
through CSR contribution
[D] Convergence
2.24 This Scheme would dovetail and attempt convergence with schemes of other Ministries and
State Governments. Such convergence would be ensured at the time of preparation and approval of
the proposals for Annual Work Plan and Budgets (AWP&B) to avoid overlapping in coverage. The
PAB for approval of AWP&B would have representatives of the relevant Ministries and States to
strengthen convergent action. Other schemes which would supplement/contribute to the objective of
Universal Access and Retention of the integrated Scheme are as below:
A. Pre-School education through the Anganwadi centres under the Umbrella Integrated Child
Development Scheme (ICDS).
B. National Child Labour Project (NCLP) of the Ministry of Labour to promote successful
mainstreaming into regular schools of all children who have been withdrawn from child
labour and rehabilitated.
C. Residential facilities for SC and ST children by the Ministry of Social Justice &
Empowerment and Ministry of Tribal Affairs.
D. Scheme of Assistance to Disabled Persons for Purchase/Fitting of Aids/Appliances (ADIP
Scheme) and Scheme for Implementation of Persons with Disabilities Act, 1995 (SIPDA) by
Ministry of Social Justice and Empowerment.
E. Pradhan Mantri Kaushal Vikas Yojana (PMKVY) of Ministry of Skill Development and
Entrepreneurship (MOSDE)
F. Mapping of other available incentives to induce access and retention of children: Books,
Uniform, bags, awards, scholarships, and other benefits, etc
G. National Rural Drinking Water Programme and Swachh Bharat Mission for providing Toilets
and Drinking Water facilities
H. MGNREGA guidelines provides for construction of play fields and compound walls for
Government run schools in the villages (Reference:-Gazette of India No. REGD.
No.D.L.33004/99 dated 28th March 2017 issued by Ministry of Rural Development
Notification), resources will be mobilized for meeting the labor component of construction of
school infrastructure in rural areas.
DRAFT DOCUMENT
29
I. Multi Sector Development Program (MSDP) of the Ministry of Minority Affairs may be used
for infrastructural development in minority dominated areas.
J. Khelo India of Ministry of Youth Affairs and Sports may be tapped for a significant portion of
the Sport and Physical Education component.
K. Joint mapping of facilities established under Pandit Madan Mohan Malviya National Mission
on Teachers and Teaching (PMMMNMTT) and Central University Scheme of MHRD (DoHE
and DoSE&L).
2.27 The State Plans should clearly indicate the areas of convergence with other schemes including
details of infrastructure development & funds to be availed under these schemes.
DRAFT DOCUMENT
30
ANNEXURE I
FRAMEWORK NORMS FOR INTERVENTION FOR INFRASTRUCTURE
DEVELOPMENT AND MAINTENANCE UNDER SAMAGRA SHIKSHA
Sl. No. Component /
Activity Programmatic Norms Norms / Guidelines for
implementation
1. New/Upgraded
Schools from Preschool to XII
a) Pre-Primary School:
Infrastructure available under Integrated Child
Development Scheme through, co-location of
Anganwadis of Ministry of Women and Child
Development (MWCD) will be utilized for Preschool. A detailed mechanism for expansion of preschool will be finalized in consultation with
MWCD.
(b) Elementary level :
As per RTE norms and standards under the
Schedule to Sections 19 and 25 of the RTE Act
2009, the school building has to be an all-weather
building consisting of:
i) At least one class room for every teacher and
an office-cum- store-cum-Head teacher’s
room;
ii) Barrier-free access;
iii) Separate toilets for boys and girls;
iv) Safe and adequate drinking water facilities to
all children;
v) A kitchen where Mid Day Meal is cooked in
the school;
vi) Playground;
 vii) Arrangement for securing the school
building by boundary wall or fencing;
viii) Library in each school providing
newspaper, magazines and books on all
 subjects including story books;
ix) Play material, games and sports
equipments as required
(c) Secondary and Senior Secondary schools:
For New/Upgraded Secondary and Senior
Secondary schools infrastructure support will be
provided for the following:
i) The facilities would include class rooms with
furniture, library, laboratory (stream-wise for Senior
Secondary and integrated for secondary
level),vocational lab, computer room, room for
guidance and counseling services cum medical
room, Head Master room, staff room, Art and Craft
room, toilet blocks, safe drinking water, separate
toilets with water facility for boys, girls and CWSN.
ii) Norms for classrooms :
• 4 class rooms for 2 section school / 2 class
rooms for 1 section school for Secondary
Schools.
(a) No expenditure on
construction of office
buildings.
DRAFT DOCUMENT
31
Sl. No. Component /
Activity Programmatic Norms Norms / Guidelines for
implementation
• 4 class rooms for 2 section school / 2 class
rooms for 1 section school for Senior
Secondary Schools for each stream i.e.
Science, Arts and Commerce.
• 1 integrated Science Laboratory for
Secondary School.
• 4 laboratory for physics, chemistry, Biology
& Maths for Senior Secondary
(d) For proposal of new schools State would
confirm land availability certified by the Revenue
authority. The need for new school should also be
supported by Geographic Information System (GIS)
and community based mapping.
(e) For school buildings the norms as per BIS code
(IS: 8827–1978, Reaffirmed in 2006) are to be
adopted as may be applicable. Plot area other than
playfields to be two to three times the built up area
(on all floors) depending on the number of storeys.
2. Residential
Schools /Hostels
a)Residential schools/hostels may be supported
for reaching out to children in sparsely populated
or hilly and densely forested areas with difficult
geographical terrain and border areas where new
primary or upper primary and secondary/senior
Secondary schools may not be viable. Preference
will be given to EBBs, LWE affected districts,
SFDs and the 115 aspirational districts identified
by NITI Aayog.
(b) Girls hostel sanctioned under erstwhile
RMSA scheme for EBBs to be integrated with
KGBV which is to be extended up to class XII.
(c) Provision for separate boys’ and girls’ hostel in
case of Co-educational residential school. Area
norms for Boys’ hostel are the same as that of
KGBV hostel
(d) Residential Schools/Hostel norms include
provision of open space for physical activities like
sports etc.
(a) As per norms for
KGBV/ Girls’ hostel.
(b) Norms for schools
as prescribed under
New/ Upgradation of
Schools as above.
(c) Construction cost
for redeploying public
buildings and
refurbishing unused old
buildings will be on a
case to case basis.
3. Strengthening
of physical
infrastructure and
Establishment of
New DIETs/
SCERTs
(a) Strengthening of SCERTs including
maintenance. Norms as per Annexures-V(a) and
Annexure-V(b) in Chapter 6.
(b) Norms for new DIETs /Renovation of DIETs
buildings are indicated at Annexure-VI in Chapter
6.
(c)Establishment of special Cells for SCERT:
Laboratories for Science, Mathematics, Social
Studies, Education Technology, Computer &
Language, English Education.
(a) Establishment of
special Cells for
SCERT (One time
grant) up to Rs. 50 lakh
per SCERT /SIE (10
lakhs per special cell)
(Non-recurring).
DRAFT DOCUMENT
32
Sl. No. Component /
Activity Programmatic Norms Norms / Guidelines for
implementation
4. BRC /CRC (a)There would ordinarily be one BRC in each
community development (CD) block.
(b)BRC/URC should be located in school campuses
as far possible.
(c) CRC may be used as an additional class room on
days when CRC meetings are not held.
(a) Provision of Rs. 5
lakh for furniture,
computer, TLE / TLM,
recurring expenditure,
meetings, contingencies
etc.
(b) CRC construction
cost will be as per
schedule of Rates
notified by the state for
Additional Class room.
(c) Provision for
CRCs upto
Rs.2.00 lakh for
furniture, computer,
TLE, TLM, recurring
expenditure, meetings,
contingencies etc.
5. Residential
Quarters
(a)Schools situated in remote and difficult areas
including sparsely populated or hilly and densely
forested areas and border areas.
(b)As far as possible Quarters may be built as
residential clusters and also nearer to the schools.
(c) Type II quarters as per CPWD Plinth area
norms
Strengthening of Existing Schools (only for Government owned School building)
6. Additional
Classroom
(a) ACR will be sanctioned based on enrollment.
(b)The indicative Student Class Room Ratio would
be 30:1 (for Primary), 35:1 (for Upper Primary) and
40:1(for Secondary to Senior Secondary) or as per
State RTE rules or local requirement.
(c)For class rooms, the norms as per BIS code (IS:
8827 – 1978, Reaffirmed in 2006) are to be
followed.
(a) Cost of construction
of ACR in Secondary
and Senior Secondary
schools will include
furniture.
7. Library (a)In order to complement the activities under
Padhe Bharat Badhe Bharat and inculcate the
reading habit among students of all ages,
strengthening of school libraries including purchase
of books will be provided.
(b)It must involve elements of community
contribution.
(c)Library will be established and run in a room of
adequate size. For physical space, the norms are as
per BIS code (IS: 8827 – 1978, Reaffirmed in
2006).
(a) Cost of construction
will include
furniture, Almirah,
racks, fixtures,
fittings, circulation
area (verandah) etc.
8. Toilets (a) Adequate number of toilets with water facilities
in each school separately for boys, girls, staff and
DRAFT DOCUMENT
33
Sl. No. Component /
Activity Programmatic Norms Norms / Guidelines for
implementation
teachers and differently abled children.
(b) Girls’ toilets to be provided with
environmentally safe incinerators
(c) Relevant norms as per BIS Code.
9. Separate Toilets
for CWSN
a) Every school will ascertain the number of CWSN
gender-wise and accordingly provide separate
toilet facilities for them.
(b) Girls’ CWSN toilet should have a provision for
environmentally safe incinerator.
(c) Existing toilet can be converted to CWSN
friendly toilet.
(d) Relevant norms as per BIS Codes and
‘Harmonized Guidelines and Space Standards
for Barrier Free Built Environment For Persons
with Disability and Elderly Persons’ February,
2016 issued by Ministry of Urban
Development, Govt. of India.
10. Safe Drinking
water facilities
(a) Adequate safe drinking water facilities in
every school.
(b) Relevant norms as per BIS Codes.
11. Barrier free
access-Ramp with
Railing
(a)The school premises including all the rooms to
have barrier free access to CWSN.
(b)Relevant norms as per BIS Codes and
‘Harmonized Guidelines and Space Standards for
Barrier Free Built Environment For Persons with
Disability and Elderly Persons’ February, 2016
issued by Ministry of Urban Development, Govt. of
India.
12. Internal
Electrification
(a)Electrification will include Renewable energy
like Wind Energy, Solar Energy etc. based on the
proposal of the State after seeing the viability.
(b)For installation of on-grid and off-grid roof top
solar installations the norms are as prescribed by
Ministry of New and Renewable Energy (MNRE)
(c)Relevant norms as per BIS Codes.
(a) Proposal to conform
the financial norms
of MNRE.
13. Furniture Furniture may be provided to existing Government
upper primary schools, which do not already have
furniture.
(a) Financial norms to
be on the basis of per
child one time grant in
Government Upper
Primary School.
(b) For construction of
new schools and up
gradation of existing
schools, cost estimate
will include furniture,
as applicable.
14. Major Repair to (a) The scheme will support expenditure on Major
DRAFT DOCUMENT
34
Sl. No. Component /
Activity Programmatic Norms Norms / Guidelines for
implementation
school buildings repairs in order to ensure safety and better
functionality of Schools. The budget allotted will be
proportionately distributed among the States as per
the number of schools.
(b) Schools constructed within the past 10 years
will not be considered for major repairs. Also the
cost of repairs to be undertaken should not exceed
60% of the cost of a new construction.
(c) Repairs to dysfunctional toilets and drinking
water facilities will form a part of this component.
(d) Pre-repair and post repair photograph need to be
maintained and also uploaded online.
15. Composite School
Grant
(a)School grant to all Government schools on
annual basis for the replacement of non-functional
school equipment and for incurring other recurring
costs such as consumables, play material, games,
sports equipment, laboratories, electricity charges,
internet, water, teaching aids etc.
(b)To provide annual maintenance and repair of
existing school building, toilets and other facilities
to upkeep the infrastructure in good condition.
(c)To promote Swachh Bharat campaign and
undertake activities under Swachhta Action Plan.
(d)Must involve elements of community
contribution.
(a) There must be
transparency in
utilization and
provision for social
Audit.
(b) To be spent
preferably by VEC/
SMC /SMDC.
16. Laboratory (a) Provision for laboratory will be Subject-wise
for Senior Secondary and integrated for
secondary level.
(b) In case of composite school subject-wise lab
would be utilized for secondary level also.
(c)The vocational subjects are to be introduced as
an additional subject at the secondary level and
as compulsory (elective) at the Senior
Secondary level.
(d)For physical space, the norms as per BIS code
(IS: 8827 – 1978, Reaffirmed in 2006) are to be
followed.
(a) Up to Rs. 5 lakh per
school per job role for
Tools & Equipment
including Furniture,
Computers etc.
17. Science Lab
Equipment
(a) For Integrated Labs for Secondary Schools
equipment shall be provided as per NCERT
guidelines for establishment of Integrated
Science and Mathematics Lab. for Secondary
Schools.
(b) For Senior Secondary Schools Lab Equipment
shall be provided as per NCERT subject-wise
Lab Kits for Physics, Chemistry Biology and
Mathematics as below:
(a) As per NCERT
guidelines.
(b) Norms for Subject
wise labs equipment as
per NCERT subjectwise lab kits.
DRAFT DOCUMENT
35
Sl. No. Component /
Activity Programmatic Norms Norms / Guidelines for
implementation
Type of Educational School Kit Cost
Senior Secondary Physics Lab Kit
(SSPLK)
As
prescribed
by NCERT
Guidelines
and revised
from time
to time.
Senior Secondary Chemistry Lab
Kit (SSCLK)
Senior Secondary Biology Lab kit
with Microscope (SSBL-M)
Senior Secondary Biology lab kit
without Microscope (SSBL-WM)
Senior Secondary Mathematics Lab
Kit (SSML)
Details of items are available at :
http://www.ncert.nic.in/departments/nie/niew/schoo
l_kits/sr_sec_level/How%20to%20get%20kits.pdf
18. Head Master
/Principal Room
One HM room for schools where there is no HM
room available provided number of students is more
than 150.
19. Office Room One office room in Secondary/ Senior Secondary
schools where there is no existing office room.
20. Computer Room (a) One Computer room as per requirement in the
schools where there is no such room available.
(b) For physical space, the norms as per BIS code
(IS: 8827 – 1978, Reaffirmed in 2006) are to be
followed.
21. Art/Craft/Culture
laboratory
(a)One Art/Craft/Culture laboratory as per
requirement in Secondary/Senior Secondary
Schools where there is no such facility.
(b)For physical space, the norms as per BIS code
(IS: 8827 – 1978, Reaffirmed in 2006) are to be
followed.
22. Playground Playground facilities for the school will be provided
through MGNREGA (Reference: - Gazette of India
No.REGD.No.D.L.33004/99 dated 28th March 2017
issued by Ministry of Rural Development
Notification), / under convergence with other Govt.
departments and with community participation.
23. Sports Equipment Expenditure for meeting expenses on procuring
sports equipment for indoor and outdoor games in
convergence with Department of Sports.
24. Boundary Wall Boundary wall will be provided in convergence
with Mahatma Gandhi National Rural Employment
Guarantee Act (MGNREGA) (Reference: - Gazette
of India No.REGD.No. D.L. 33004/99 dated 28th
March 2017 issued by Ministry of Rural
Development Notification) and other schemes.
25. Child Friendly
Elements/ BALA
Child friendly elements can be sanctioned in order
to enhance interest of students in the learning
process as per the proposal by the state.
26. KGBV (a) KGBVs to be extended up to class XII for
smooth transition of girls from elementary to Senior
DRAFT DOCUMENT
36
Sl. No. Component /
Activity Programmatic Norms Norms / Guidelines for
implementation
Secondary.
(b) Priority will be given for upgradation of KGBV
where the Girls’ hostel has been established in the
same campus and there is no secondary/Sr.
Secondary school in the vicinity, as per
neighbourhood norms.
(c) Norms for Hostel:
The total area for 50 girls’ hostel, 100 girls’ hostels
and 200 girls’ hostel will be approximately 7000
sqft, 11300 sqft and 20790 sqft respectively as per
the details worked at Annexure-II.
(d) Cost of electrification and PHE installation shall
be part of main estimate.
(e) The buildings will be designed as per National
Building Code (NBC) 2016 and structure shall
be earthquake resilient and will be fitted with
basic fire safety equipments and in compliance
with NDMA guidelines on school safety.
(f) Norms for schools as prescribed under
New/Upgradation of Schools as above.
27. Procurement of
Goods
Procurement of goods should preferably be done from Government eMarketplace (GeM) portal.
28. Norms for
preparation of
estimates
Preparation of estimates for the scheme will be on the basis of State Schedule
of Rates (SSOR) or CPWD rates whichever is lower.

DRAFT DOCUMENT
37
ANNEXURE-II
GIRLS HOSTEL (AS PER NORMS FOR KGBV / GIRLS HOSTEL)
a) For 100 bedded Girls Hostel
Sl.
No.
Items No. Area
(Sq. ft.)
Total Area
(Sq. ft.)
1 Construction of building (carpet area of the
building should be approximately 60 sq.ft. per
child for hostel with 100 children
-------- ----------- 6000
2 (a) Bath rooms with W/C for general students 16 30 480
(b)Bath rooms with WC for
differently abled students
1 45 45
3 Kitchen with store 1 300 300
4 Dining Hall 1 400 400
5 Warden’s residence-cum-office 1 450 450
6 Mini library-cum-reading room 1 200 200
7 Recreation room 1 200 200
8 Security room 1 100 100
9 Generator room 1 100 100
10 Medical check-cum-visitor room 1 100 100
 Sub Total 8375
 Adding for 20% circulation area and 15%
wall thickness
 @35 % 2931.25
Total 11306.25
Say Total 11300
b) For 50 bedded Girls Hostel
Sl.
No
Items No. Area
 (Sq. ft.)
Total Area
 (Sq. ft.)
1 Construction of building (carpet area of the
building should be approximately 60 sq.ft. per
child for hostel with 50 children
-------- ----------
-
3000
2 (a) Bath rooms with W/C for general students 8 30 240
(b)Bath rooms with WC for differently abled
students
1 45 45
3 Kitchen with store 1 300 300
4 Dining Hall 1 400 400
5 Warden’s residence-cum-office 1 450 450
6 Mini library-cum-reading room 1 200 200
7 Recreation room 1 200 200
8 Security room 1 100 100
9 Generator room 1 100 100
10 Medical check-cum-visitor room 1 100 100
 Sub Total 5135
 Adding for 20% circulation area and 15%
wall thickness
 @35 % 1797.25
Total 6932.25
Say Total 7000
DRAFT DOCUMENT
38
(c ) For 200 bedded Girls Hostel
Sl.
No
Items No. Area
 (Sq. ft.)
Total Area
(Sq. ft.)
1 Construction of building (carpet area of the
building should be approximately 60 sq.ft. per
child for hostel with 200 children
-------- ----------- 12000
2 (a) Bath rooms with W/C for general students 32 30 960
 (b)Bath rooms with WC for
 differently abled students
2 45 90
3 Kitchen with store 1 400 400
4 Dining Hall 1 500 500
5 Warden’s residence-cum-office 1 450 450
6 Mini library-cum-reading room 1 300 300
7 Recreation room 1 400 400
8 Security room 1 100 100
9 Generator room 1 100 100
10 Medical check-cum-visitor room 1 100 100
 Sub Total 15400
 Adding for 20% circulation area and 15% wall
thickness
 @35 % 5390
Total 20790
Say Total 20790
*****

DRAFT DOCUMENT
39
CHAPTER 3 – ADDRESSING GENDER AND EQUITY ISSUES IN
SCHOOL EDUCATION
3.1 Context
Bridging gender and social category gaps at all levels of school education is one of the
major objectives of the Integrated Scheme. Consequently, the Integrated Scheme attempts to reach
out to girls, and children belonging to SC, ST, Minority communities and transgender. The scheme
also gives attention to urban deprived children, children affected by periodic migration, and
children living in remote and scattered habitations. The Integrated Scheme also focuses on the
identified SFDs on the basis of adverse performance on various indicators of enrolment, retention,
and gender parity, as well as based on higher concentration of SC, ST and minority communities.
3.1.1 Although various centrally sponsored schemes have contributed significantly in addressing
the gender and equity issues at different levels of school education, there is a need to build on these
gains by further synergizing our efforts in accordance with the SDGs to ensure inclusive and
equitable quality education and the objectives envisaged in the Integrated Scheme.
3.2 RTE, equity and social inclusion
The enactment of the RTE Act, 2009 requires addressing gender and social equity within a
framework that is holistic and systemic. The Act has defined children belonging to disadvantaged
groups and children belonging to weaker sections as follows:
Disadvantaged Group are defined as those that belonged to the “children with disability,
SC, ST, socially and educationally backward class or such other groups having
disadvantage owing to social, cultural, economical, geographical, linguistic, gender, or
such other factors as may be specified by the appropriate Government by notification”.
Weaker Sections are defined as those “belonging to such parent or guardian whose annual
income is lower than the minimum specified by the appropriate Government by
notification”.
3.2.2 The Act requires the appropriate government and every local authority to “ensure that the
child belonging to weaker sections and the child belonging to disadvantaged groups are not
discriminated against and prevented from pursuing and completing elementary education on any
grounds”. In stating thus, the RTE Act opens up the whole sphere of circumstances which come in
the way of a child’s enrolment and participation in school, and his/her completion of the elementary
stage. This necessitates an attempt at listing categories of children who might be covered under
section 2(d) and (e) and spelling out possible strategies to prevent explicit and implicit
discrimination in pursuing and completing elementary education.
3.2.3 Gender cuts across the categories of disadvantaged groups as well as weaker sections. The
RTE Act in different sections makes reference to gender and girls’ education both explicitly and
implicitly. Some of the relevant provisions are: no discrimination against children from
‘disadvantaged groups and ‘weaker sections’ on any grounds (including gender); inclusion of
women in school monitoring committees; provision of good quality education that includes equity
DRAFT DOCUMENT
40
issues, curriculum development in conformity with constitutional stipulations, training, enrolment
in age appropriate classes (which will largely apply to girls, especially from disadvantaged
communities).
3.3 Approach in the Integrated Scheme
It is envisaged to improve quality of education, ensuring equity and inclusion at all levels of
school education. The key parameters of the approach will be informed by the following
perspectives:
I. Equity will mean not only equal opportunity, but also creation of conditions in which the
disadvantaged sections of the society – children of SC, ST, Muslim minority, landless
agricultural workers and children with special needs, transgender children etc. can avail of
the opportunity in an inclusive environment free from discrimination.
II. Gender will be a critical cross-cutting equity issue and will imply not only making efforts
to enable girls to keep pace with boys but to view education in the perspective spelt out in
the National Policy on Education i.e. a decisive intervention to bring about a basic change
in the status of women. As the issues of gender, equity and quality are interlinked, efforts
which are aimed at one must also include the other.
III. Access will not be confined to merely ensuring that a school becomes accessible to all
children within specified distance but implies an understanding of the educational needs
and predicament of the traditionally excluded categories – the SC, ST and other sections of
the most disadvantaged groups, the Muslim minority, girls in general, transgender children
and children with special needs.
IV. Quality with Equity: Equity will be seen as an integral part of the agenda on improving
quality and will therefore encompass issues pertaining to teacher training and education,
curriculum, language, educational planning and management.
3.3.1 The equity agenda of the Integrated Scheme would work towards:
(i) Moving from an incentives and provisions-based approach to outcome based approach;
(ii) Developing a deeper understanding on issues contributing to exclusion and disadvantage
and challenges faced by children from disadvantaged communities including within the
school space;
(iii) Assessing and addressing the needs of different excluded and marginalised groups and
communities through contextualized strategies;
(iv) Encouraging innovative thinking and dialogue to identify holistic, multi-pronged and
viable strategies to address issues of gender, equity and exclusion.
(v) Up-scaling and institutionalisation of interventions and strategies found effective, viable
and sustainable with a view to strengthening the mainstream education system.
DRAFT DOCUMENT
41
3.3.2 Equity would therefore, mean focus on addressing exclusion of girls and children belonging
to SCs, STs, Marginalized communities and of the other deprived affected and vulnerable groups13
who constitute the bulk of excluded children in the country. It will also mean including gender and
other equity issues within the quality goal.
3.4 Gender and Girls’ Education
3.4.1 The Perspective: The Integrated Scheme acknowledges that reaching out to the girl child is
the central focus of gender parity which is emphasized in the NPE and the POA (1986/92). More
importantly, it linked education of women and girls to their empowerment. NPE states that
education should be a transformative force, build women’s self-confidence, and improve their
position in society and challenge inequalities.
3.4.2 The approach to gender and girls’ education has pointed out that although gender has
become an accepted category in policy and programme formulation, it continues to be understood
in limited ways. It is largely seen as a biological category (concerning only girls and women); as a
stand-alone category (not related to other issues or other forms of discrimination); and in terms of
provision of opportunities so that girls can ‘catch up’ with boys and ‘close the gap’. Thus,
achieving gender parity has been an overarching concern of the education system. While this is of
critical importance and has led to some impressive improvements in girls’ enrolment, retention and
completion, it has also led to gender being understood primarily in quantitative terms.
3.4.3 Addressing gender and social disadvantages will be an integral part for the concerns of
quality and equity. Girls are not a homogenous or singular category and gender does not operate in
isolation but in conjunction with other social categories resulting in girls’ having to experience

13This also refers to those living in areas affected by left wing extremist including children affected from migration,
urban deprived children, homeless children, children in remote and sparsely populated habitations, other groups and
categories of excluded children and CWSN.
Major Interventions emphasised for girls under the new scheme are:
i) Opening of schools in the neighbourhood as defined by the State.
ii) Provision of free text-books to Girls up to Class VIII
iii) Uniforms to all girls up to Class VIII
iv) Provision of gender segregated toilets in all schools
v) Teachers’ sensitization programmes to promote girls’ participation.
vi) Provision for Self-Defence training for the girls from classes VI to XII
vii) Stipend to CWSN girls from class I to Class XII
viii) Upgradation of KGBVs for Girls from classes VI - VIII to classes VI - XII.
ix) Construction of residential quarters for teachers in remote/hilly areas/in
areas with difficult terrain.
x) Gender audit of text books and pedagogical practices.
xi) Interventions focused on enhancing safety and security of girls in schools
including hostels.
DRAFT DOCUMENT
42
multiple forms of disadvantage. The dimensions of location (rural-urban), caste, class, religion,
ethnicity, disabilities etc. intersect with gender to create a complex reality. Curriculum, textbooks,
pedagogy need to capture the entire web of practices, social and economic relations that determine
an individual’s location in the social reality and shapes her lived experiences. Developing such an
understanding is necessary for improving classroom practices, curriculum, training and strategies
for reaching the remaining out-of-school children.
3.4.4 There has been significant improvement and innovation in the area of gender and girls
education. As a result, several women have been empowered and a space has been created to raise
gender concerns and develop a better understanding of the structural and social barriers to girls’
education. However, since the long-term objective is to transform unequal gender relations and
bring about systemic change, therefore, it would be equally important to build on these gains and
include boys and men more significantly in this process. In order to address gender, it is therefore
necessary to go beyond specific schemes and provisions and to treat it as a systemic issue.
3.5 Access and Retention for Girls:
3.5.1 Despite significant improvement in the enrolment of girls, girls from disadvantaged
communities continue to form the bulk of out-of school children. Therefore both access and
retention are considered to be an equity issue, as SC, ST, Muslim girls are vulnerable, and most
likely to dropout. In the Integrated Scheme, with regard to access and retention, the focus would be
on older girls, where the need is the greatest. Support measures that address economic, academic
and social dimensions that lead to dropout would need to be planned as a more cohesive
intervention. Measures would include transport, escort, counselling, helping them negotiate
domestic work burdens, community support mechanisms and academic support depending on the
nature of the problem.
3.5.2 Moreover, as adolescence is a crucial and complex stage of life where young people
discover issues related to sexuality and develop a sense of self, innovative measures to bolster girls’
self-esteem and confidence (in addition to imparting the regular curricula content) would be
included. Attention would be paid to addressing the particular needs of girls from other
disadvantaged groups or those living in difficult circumstances (street children, migrant children,
and girls in conflict situations), who are particularly vulnerable and face several security concerns.
3.6 Gender, Equity and Quality
3.6.1 Issues of quality and equity are interlinked. It is important to understand that poor quality
impacts on equity and poor equity reinforces poor quality. Therefore, efforts which are aimed at one
must also include the other. Quality concerns are being increasingly highlighted and the approach to
quality improvement is undergoing a major shift to become integrated, comprehensive and
overarching. In the context of implementing the Scheme, the approach in shifting to quality would
be enriched whereby the curriculum, textbooks, teaching-learning materials, the use of space in the
classroom, infrastructure, assessment and teacher trainings are looked at holistically and mutually
reinforce each other. Each of these issues would need to be addressed from a gender equality
perspective.
3.6.2 Gender and Violence: Gender equality and parity can never be achieved at the cost of
DRAFT DOCUMENT
43
Educationally Backward Blocks
(EBBs)
Initially the
Educationally Backward Blocks
(EBBs) were defined as blocks
where rural female literacy rate
is below the national average
(46.13%) as per Census 2001
and Gender Gap in Literacy
being above the national
average of 21.59%. Both these
criteria had been earmarked by
the Registrar General of India
(RGI).
Further, the definition
of EBBs has been revised in
2010 to include all blocks where
rural female literacy rate is
below the national average
(46.13%) as per Census 2001.
devaluation of the other gender. Violence against girls and women mirrors the socialization
practices, which perpetuates gender stereotypes, discrimination and devaluation of girls and women.
These incidents cut across caste, class, religion and location and can only be reduced through
attitudinal transformation, questioning socialization processes, cultural practices that can also be
addressed through education as one of the significant agencies of social change.
3.6.2.1 Thus, it is important to initiate transformative changes for making gender an integral part of
the schooling process. There is also a need to make schooling spaces address needs of both boys
and girls from all contexts, especially during adolescence. Changes have to take into account sexual
behavior of both boys and girls and evolve a mechanism to address harmful practices related to
sexual abuse, violence, exploitation and discrimination.
3.7 Special Provisions for equitable School Education with focus on Girls
3.7.1 Kasturba Gandhi BalikaVidyalaya (KGBV)
The Kasturba Gandhi Balika Vidyalaya (KGBV) was
launched by the Government of India for setting up
residential schools at the upper primary level for girls
belonging predominantly to the SC, ST, OBC and minority
communities in difficult areas. KGBVs are set up in
educationally backward blocks (EBBs).
Components of the earlier scheme under SSA: Setting
up of residential schools where there were a minimum of 50
girls predominantly from the SC, ST and minority
communities available to study in the school at the
elementary level. There were three types of KGBV models
setup under the Scheme of SSA:
(i) Model I: School with hostels facility for 100-150 girls
(ii) Model II: School with hostel facility for 50 girls
(iii) Model III: Hostels in existing schools for 50-150 girls
3.7.1.1 Reports highlighting about expansion of KGBVs
The importance of the KGBV Scheme in addressing the educational needs of girls from
marginalised communities has been highlighted in various reviews.
DRAFT DOCUMENT
44
Major recommendations for extending KGBVs
 National level Evaluation of KGBVs was undertaken in 2007-2008 and in
December, 2013.
 In 2013 the evaluation team made the following important suggestion:
 “While the idea of extending the KGBV to class 10 and 12 is laudable and desirable,
it should be done in a planned manner ensuring sufficient funds for upgraded
infrastructure and staffing. It has been suggested that a new programme may be
devised by providing an additional amount for the hostel and school to the KGBV
along with a budget for building hostel.”
 The CABE Sub-Committee constituted on 23rd January, 2017 to look into the issues
related to ‘Girls’ Education’ has also recommended ‘to encourage Residential
Schooling facility for girls and upgradation of the existing KGBVs up to class XII’.
MenakaKaipeng
KGBV, Ampinagar R. D Block, Tripura
Menaka was identified during VidyalayaChaloAbhiyan
and got enrolled in a KGBV in the year 2006-07 attached
to Haripur High School under Ampinagar R. D Block.
She faced multiple challenges as a first generation
learner. In 2014, Menaka passed her Senior Secondary
Exams and is currently pursuing Bachelor of Arts from
Women’s College, Agartala. Menaka is an inspiration for
the other girls of KGBV in Tripura.
Pushpa Kumari
Kasturba Gandhi Balika Vidyalaya, Bundu, District, Ranchi, Jharkhand
Pushpa attended school till class V but had to drop out due to familial circumstances and socioeconomic issues. However, in 2012-13, she got enrolled in class VI in the KGBV. While studying,
Pushpa developed a low cost baby food product with the guidance of her teacher. This baby foodBalAmrit is prepared from 15 local ingredients (jaggery, basil and mint leaves, and soya beans etc).
The BalAmrit was the center of attraction at the state level 43rd Jawaharlal Nehru Science,
Mathematics and Environment exhibition (February, 2016). Pushpa was selected to participate in
Exchange programme of Science and Technology Agency SAKURA, Japan (May, 2016). Currently,
the baby food sample has been sent for copyright purposes to the Ministry of AYUSH.
Sarita
KGBV, Pahariya, District Janjgir,
Chhattisgarh
Sarita was admitted in class VI in the
Pahariya KGBV in 2006-07. With the
support of the warden and teaching staff
she completed her schooling following
which, she pursued her degree in
Medical Sciences from Medical College
SIMS Bilaspur, Chhattisgarh. At
present, Sarita is preparing for Public
Service Examination.
DRAFT DOCUMENT
45

3.7.2 Girls’ Hostel for students of secondary and Senior Secondary schools:
Gender disparities still persist in rural areas of the country, particularly among the
disadvantaged communities like SCs, STs, OBCs and Minorities and gaps in enrolment of girls
at the elementary and secondary levels as compared to boys are also visible. To establish a
conducive environment, to reduce the dropouts and promote the enrolment of Girl Child
belonging to SC/ST/ OBC/Minority Communities and BPL girls and to make secondary
education of good quality accessible and affordable residential facilities to Girl’s in the age
group of 14-18 years studying in class IX–XII, the Girls Hostel Scheme was launched in 2009-
10.
3.7.2.2 The scheme envisaged setting up of hostels with lodging and boarding facilities in the
EBBs and areas nearing concentration of above target groups so that the girl students are not
denied the opportunity to continue their study due to societal factors.
3.7.2.3 Girls belonging to SC, ST, OBC, Minority communities and BPL families and studying
in classes IX-XII in a recognized school in the EBB (run by any authority, State, District or
NGO) with a valid certificate from school Head Master are eligible to stay in the hostels. At
least 50% of the girls admitted to the hostels belong to SCs, STs, OBCs and Minority
communities.
3.7.2.4 Strategy for Construction of Hostels/Schools
Wherever space was available in the KGBV compound, the Hostel was preferably constructed and
the hostels are under the administrative control of the concerned KGBV. Students passing out from
the KGBV are given preference for admission in the hostel. In case, there is no spare space in the
KGBV compound or in the blocks where no KGBV has been established, the hostel was
constructed in the compound of a secondary/Senior Secondary school selected by the State/UT
L. Kamatchi
KGBV Tharisukkadu, Villupuram
District, Tamil Nadu
Kamatchi, belongs to the ST
community and hailed from a very poor
family. Due to her family condition, she
discontinued her studies at standard 4th
and was pushed to grazing goats. KGBV
teachers identified her during their
survey and got enrolled in the KGBV
during 2005 at Sankarapuram.
After completing her study, she
underwent placement training at
Polytechnic College in Sankarapuram.
Presently she is working in a Private
company at Chennai and also preparing
for the Tamil Nadu Public Service
Commission Group Exams.
Nilam Dashrath bhai Rathva
KGBV Bilvan, Tamarpada, Dist. Surat, Gujarat
Nilam comes from a very poor family living in the
most backward area of ChotaUdepur district. Her
parents work as laborer in a farm to fulfill her family
needs. After her admission in 2011, she got training
in Karate from class 6th and won 3 gold medals and
one silver medal at national level tournaments in
2012 & 2013.
Her biggest and important achievement is she has
received Instructor license and 1st DAN Black-belt
certificate from WADO-RYU KARATE DO
FEDERATION OF INDIA (WKFI),which will help
her get employed as a coach in any training
academy. In 2014-15, she got second rank in national
archery tournament. Presently, she is studying in Std.
10 in block Umarpada, KGBV Bilvan, District Surat.
DRAFT DOCUMENT
46
Government. However, students of the neighbouring schools are also eligible for staying in the
hostel.
3.7.2.5 Implementation of the Scheme
(i) While preparing an annual plan for Hostel, State has to indicate the name of the block
to be covered, name of the school to which the hostel is proposed to be attached,
names of secondary/Senior Secondary schools in the neighbourhood of the hostel,
availability of the land for construction of the hostel, especially if the hostel is not to
be located in a KGBV.
(ii) A teacher from the KGBV or a lady teacher from the school to which the hostel was
attached may be appointed as warden of the hostel. She was paid an honorarium as
per the norms of the scheme in addition to her salary and was entitled to free family
accommodation in the hostel.
(iii) Each inmate may be provided with photo ID along with unique number in order to
ensure easy monitoring. On the back of the card, grievances redressal mechanism and
contact numbers and addresses of responsible persons were provided in the local
language. State Governments were also encouraged to set up free help lines for
redressal of grievances.
(iv) Panchayats were involved in the implementation of any residential scheme for girls'
schooling. They were required to have an updated list of girls who have completed
primary schooling and are in need of hostel facilities.
(v) State Governments were required to ensure wide publicity to the scheme with
publication of guidelines of the scheme in leading regional newspapers and
Doordarshan at least once in a year.
(vii) One of the walls of the hostel has to be painted with the exact details of what the
scheme entails and what each beneficiary was entitled to under the scheme for the
information to be readily accessible. Details of grants received and the facilities
provided/ assets acquired by the hostel authorities were also required to be displayed
at each hostel.
3.8 KGBVs and Girls Hostels under the Integrated Scheme:
Under the Integrated Scheme, the existing KGBVs at upper primary level and Girls Hostels
at secondary level would be extended/converged to provide residential and schooling facilities upto
Class-XII. The objective would be to provide access and quality education to girls from
disadvantaged groups by setting up residential schools from upper primary to senior secondary level
and to ensure smooth transition of girls from elementary to secondary and upto class XII wherever
possible. The scheme will support the following interventions:
1. To upgrade schools to secondary/ Senior Secondary in KGBVs (as per norms for new
schools) wherever the secondary schools are not located in the vicinity.
2. To provide hostel for secondary/ Senior Secondary girls in the KGBVs as per the models
being followed in each state, wherever the girls hostels are not located within the KGBV
campus and secondary school is located in the vicinity.
DRAFT DOCUMENT
47
3. To provide both schooling and hostel facilities upto Class-XII in KGBVs where neither
facility is available in the vicinity.
3.8.1 This would also provide the facility to have at-least one residential school for girls from
Classes VI-XII in every educationally backward block which do not have residential schools under
any other scheme of the Ministry of Social Justice and Empowerment, Ministry of Tribal Affairs or
the State Government. This shall be ensured by the District Level Authority of the State at the time
of actual district level planning for extending such initiatives by coordinating with the other
Departments/Ministries.
3.8.2 Target Group:
Girls in the age group of 10-18 years aspiring to study in classes VI to XII; belonging to SC, ST,
OBC, Minority communities and BPL families.
i) At the primary level, the emphasis will be on the slightly older girls who are out of
school and were unable to complete primary schools (10+). However, in difficult
areas (migratory populations, scattered habitations that do not qualify for primary/
upper primary schools) younger girls can also be targeted;
ii) At the upper primary level, emphasis will be on girls, especially, adolescent girls
who are unable to go to regular schools’
iii) In view of the targeted nature of the scheme, 75% girls from SC, ST, OBC or
minority communities would be accorded priority for enrolment in such residential
schools and thereafter upto 25% girls from BPL families
3.8.3 Special provision and components of these schools will be:
i) To prepare and procure necessary teaching learning material and aids for the schools;
ii) Girls studying in classes IX-XII in a recognised school in the EBB (run by any
authority, State, District or NGO) with a valid certificate from school Head Master
will be eligible to stay in the hostels.
iii) To put in place appropriate systems to provide necessary academic support and for
evaluation and monitoring;
iv) To motivate and prepare the girls and their families to send them to residential
school;
v) Established NGOs and other non-profit making bodies may be involved in the
running of the schools, wherever possible. These residential schools can also be
adopted by the corporate groups.
3.8.4 Different Models:
Four possible models for such schools have been identified for which funding will be
provided under the scheme as per the prescribed programmatic and financial norms.
3.8.5 Up-gradation of KGBVs
Up gradation of KGBVs from upper primary to secondary and would as per following:
• The up gradation of upper primary schools to the secondary stage would include
provision of class rooms with furniture, library, Integrated Laboratory, Computer
Head Master room, Art and Craft room, Toilet blocks, Drinking water etc.
• The up gradation of KGBVs from upper primary to senior secondary will in
provision for upto three streams for classes
3.8.6 States and UTs need to follow
wise details are given below:
1. Construction of building
(As per norms given in Chapter on Infrastructure)
2. Boundary wall
3. Drinking Water & sanitation.
4. Electric installation
5. Furniture/Equipment including kitchen equipment
6. Teaching Learning Material and equipment including library books
7. Bedding (replacement of Bedding after 3 years)
8. Food and lodging
9. Stipend for girl students
10. Supplementary TLM, stationery
11. Examination fee
12. Salaries for existing KGBVs VI to VIII
as per RTE norms ,1 head teacher in case the
teachers (only for blocks with M
urban areas), if required
Cooks.
For teachers of secondary and
such classes may be followed
for all core subjects.
13. Vocational training/specific skill training
14. Electricity/ water charges
15. Medical care/Contingencies
• For existing KGBVs for classes VI to VIII Type -I
• KGBVs for classes VI to X Type -II
• KGBVs for classes VI to XII Type -III
• Exisitng Girls’ Hostels for classes IX to XII Type -IV
DRAFT DOCUMENT
Up gradation of KGBVs from upper primary to secondary and would as per following:
The up gradation of upper primary schools to the secondary stage would include
provision of class rooms with furniture, library, Integrated Laboratory, Computer
Head Master room, Art and Craft room, Toilet blocks, Drinking water etc.
The up gradation of KGBVs from upper primary to senior secondary will in
provision for upto three streams for classes – 11th& 12th
.
States and UTs need to follow these minimum requirements in KGBVs
given below:
Construction of building
(As per norms given in Chapter on Infrastructure)
Drinking Water & sanitation.
Furniture/Equipment including kitchen equipment
Teaching Learning Material and equipment including library books
Bedding (replacement of Bedding after 3 years)
Stipend for girl students
Supplementary TLM, stationery and other educational material
or existing KGBVs VI to VIII ( 1Warden, 4-5 Full time teachers
as per RTE norms ,1 head teacher in case the enrolment exceeds 100,
teachers (only for blocks with Muslim population above 20% and select
, if required, 3 part time teachers, Accountant/Assistant, Peon,
For teachers of secondary and Senior Secondary classes, State norms for
such classes may be followed to ensure availability of subject-wise teachers
.
Vocational training/specific skill training
Electricity/ water charges
Medical care/Contingencies
For existing KGBVs for classes VI to VIII
KGBVs for classes VI to X
KGBVs for classes VI to XII
Exisitng Girls’ Hostels for classes IX to XII
Up gradation of KGBVs from upper primary to secondary and would as per following:
The up gradation of upper primary schools to the secondary stage would include
provision of class rooms with furniture, library, Integrated Laboratory, Computer room,
Head Master room, Art and Craft room, Toilet blocks, Drinking water etc.
The up gradation of KGBVs from upper primary to senior secondary will include
in KGBVs for which item5 Full time teachers
exceeds 100, 2 Urdu
ove 20% and select
, 3 part time teachers, Accountant/Assistant, Peon,
classes, State norms for
wise teachers
DRAFT DOCUMENT
49
16. Maintenance
17. Miscellaneous
18. Preparatory camps
19. Self-defence training
20. PTAs/ school functions
21. Provision of Rent (8 months)
22. Capacity building
3.8.7 The States and UTs need to develop appropriate curriculum framework in collaboration with
state nodal agencies/institutes in school education such as SCERTs/SIEs etc., to strengthen the
scheme which would include empowerment issues, adolescent and growing up concerns, selfdefence, teaching-learning material, teacher training programmes and monitoring and assessment
mechanisms keeping in mind the contexts, and age of the learners and the residential nature of the
scheme which could be taken up with the involvement of experienced organizations, especially with
a strong gender orientation.
3.8.8 Training for teachers and staff at the residential schools will be coordinated by the DIETs,
BRCs etc.
3.8.9 Monitoring and Evaluation
Under the Integrated Scheme, there will be a continuing evaluation by State Government agencies
through a regular and well-structured system of field visits.
3.8.9.1 Panchayati Raj Institutions will also be involved in monitoring of the scheme. The
beneficiary lists of students eligible for hostel facilities will be verified against the household
registers maintained by the Gram Panchayats and data available with other tiers to identify any
gaps, missing names in the lists.
3.8.10 Funding Pattern or release of funds for KGBVs/Girls’ Hostels
 The States and UTs shall ensure convergence of KGBV/Girls Hostel with line
departments and also ensure that funds allocated are appropriately utilized and there is
no duplication of activities.
 The State Society should open a separate Savings Bank Account for operating the funds
of KGBV/Girls Hostel. State Government should also release its matching share to the
3.8.9.2 Methodology
Based on the number of girls and the type of residential school to be provided, the
selection of the model of the school would be done by State Level Committee. The
proposal shall be forwarded to the National level as part of their AWP&B proposal
which will be appraised with the help of external agencies/consultants, where
necessary. Finally, the Project Approval Board of the Integrated Scheme will
approve these plans.
DRAFT DOCUMENT
50
State Society through a separate budget head. Separate accounts will have to be
maintained at district and sub-district structures, accordingly.
3.8.11 Publicity of the programme
(i) State Governments will ensure wide publicity to the scheme with publication of
guidelines of the scheme in leading regional newspapers and Doordarshan at least
once in a year.
(ii) Achievements of the scheme along with location of KGBVs/Girls Hostel will also be
published in leading regional newspapers at least once in a year.
(iii) One of the walls of the KGBVs/Girls Hostel will be painted with the exact details of
what the scheme entails and what each beneficiary is entitled to under the scheme for
the information to be readily accessible. Details of grants received and the facilities
provided/ assets acquired by the KGBV authorities will also be displayed at each
hostel.
(iv) Guidelines regarding selection of KGBVs/Girls Hostels, locations selected and
details of the scheme will be put on the websites of the respective State
Governments.
(v) State Governments will develop publicity material for the scheme in the form of
brochure, which will be made available to the Panchayati Raj Institutions and
disseminated through them.
3.9 Vocationalization of Secondary Education:
The scheme provides for choice of courses by the girls in such a manner that gender
stereotyping is avoided. Special guidance and counselling session would be organized for girls as
per need. The Principal of the school is expected to take necessary steps to remove gender bias, if
any, in the minds of employers/ financiers against giving the girls employment or loans. 17 trades
including Agriculture, Apparel Made-ups and Home Furnishings, Automobile, Beauty & Wellness,
Banking, Financial services and Insurance (BFSI), Construction, Electronics, Healthcare,
Information Technology and Information Technology Enabled Services (IT & ITeS), Logistics,
Media/Entertainment, Multi Skill, Physical Education & Sports, Retail, Security, Telecom &
Travel & Tourism and Physical Education and Sports have been approved for schools under the
scheme. Course in Gems and Jewellery designing has also been approved for few schools keeping
in view the interest of girl students.
3.10 Self-defence training for Girls:
It is important to provide self-defence training for girls in the school to ensure their safety and
security so that they can complete their schooling. Self-defence training will be provided for three
months for inculcating self-defence skills including life skill for self - protection and selfdevelopment among the girls from class VI to XII. Martial Arts and Self-defence training is already
given in the Govt. schools and KGBVs. The states may also look for convergence for availing
funding for self-defence training under the Nirbhaya Fund under MoWCD, Government of India or
with other state government schemes.
DRAFT DOCUMENT
51
3.11 Special projects for equity:
Special state specific projects for varied interventions under equity will be emphasized for
enhancing access, retention and quality by promoting enrolment drives, retention and motivation
camps, gender sensitization modules etc. Financial Support will also be provided under State
Specific projects as per the allocation of flexi fund under quality to the state subject to viable
proposal received from the respective States and UTs.
3.12 Inclusion of Children from Marginalised Communities
3.12.1 Exclusionary practices
Exclusionary practices often begin even before a child reaches the school premises. An in-depth
understanding of the realities of the situation faced by marginalised children at the community and
school level, including an identification of all the points of exclusion from the level of the
household up to education system will be required. Safety of children subjected to derogatory name
calling, rebuking, even physical harassment is a significant factor determining participation of
children from such backgrounds in school. Children from SC, ST and Muslim communities have
both common as well as unique needs and challenges impeding attempts to their inclusion.
3.12.2 Exclusion of SC children:
Exclusion of SC children may happen in several ways. This could happen through teachers by
segregating the seating arrangements in the classroom with SC children made to sit separately and
typically at the back of the classroom. There is undue harshness in reprimanding SC children. Time
and attention is not given to SC children in the classroom. They are excluded in the public
functions; made to do menial jobs and sometimes denied the use of school facilities including water
resources and making derogatory remarks about their supposed inability to keep up with academic
work. Teachers are also not sensitized towards the needs of SC children. The system also excludes
them by not implementing the incentive schemes meant for them. The Integrated Scheme
recognizes that the problems of exclusion often take highly local and context specific forms and the
above mentioned issues that have emerged from the studies conducted so far, needs to be addressed
urgently.
3.12.2.1 Interventions
The interventions for children belonging to SC communities have to be based on an intensive
micro-planning, addressing the needs of every child. The following suggested list of interventions
for inclusion of SC children can help in addressing discrimination and exclusion.
There should be timely detection of all forms of discrimination against SC children by teachers and
other students. A reporting system maybe developed to monitor the discriminatory practices
happening in the school, timely redressal of such cases and norms of behaviour within the school
for both teachers and students. Curricular activities including sports, music and drama should be
encouraged as they help to break social barriers.
DRAFT DOCUMENT
52
The role of teacher is very much important for bringing about changes in the society. Teachers need
be sensitized towards the needs of SC students from the pre-service training period as well as in the
in-service training to deal with the specific problems of inclusion. Special modules should be
developed by specialized experts for use in teacher education and training programmes. Teachers’
should be provided support to develop pedagogical tools and classroom practices that help in
breaking social barriers. Norms for teacher behavior, related to corporal punishment and abuse have
been included in the RTE Act and strict monitoring and adherence to these norms would help
obliterate some of the malpractices mentioned above. The monitoring of attendance and retention of
children should be done regularly and provided with context specific interventions like residential
schools or transport as required.
3.12.3 Exclusion of ST Children:
ST children, besides facing some of the exclusionary practices mentioned above for SC children
may also face problems peculiar to their situation. Tribal populations tend to be concentrated in
remote, hilly or heavily forested areas with dispersed populations where even physical access to
schools is difficult. The Tribal Welfare Department has tried to address this problem by establishing
residential or ‘Ashram’ schools for tribal children; however, there is a need not just for many more
residential schools but also for improved quality in these schools.
The biggest problem faced by tribal children is that of language. Teaching materials and textbooks
tend to be in a language the students do not understand; content of books and syllabi ignore the
students’ own knowledge and experience and focus only on the dominant language and culture. Not
understanding the school language and therefore the course content, the children are unable to cope,
end up repeating grades and eventually dropping out.
Providing multilingual education is not a simple task. Even mother tongue education is challenged
by problems like – not having a script, language not recognized, shortage of education material in
the language, lack of appropriately trained teachers, resistance to schooling in the mother tongue by
students, parents and teachers and when several mother tongues are represented in one class, it
compounds the problem even further.
3.12.3.1 Interventions
The ST children can be assisted for learning in local language by native speakers. Educational
material should be developed in local languages using resources available within the community.
Resource centres should be used in tribal dominated states for providing training, academic and
other technical support for development of pedagogic tools and education materials catering to
multi lingual situations. Teacher should be sensitized to tribal culture and practices and trained to
teach in multilingual education. They can incorporate local knowledge in the curriculum and
textbooks. Community members can be involved in school activities to reduce social distance
between the school and the community. Special training should be given for non-tribal teachers to
work in tribal areas, including knowledge of the tribal dialect.
DRAFT DOCUMENT
53
3.12.4 Exclusion of Muslim Children:
From the scattered bits of evidence that exist, it can be said that children from Muslim families also
face various socio-cultural and economic constraints. There is early withdrawal of male children to
enable them to apprentice with artisans, mechanics etc. Even earlier withdrawal of female children
is there due to social and religious reasons. A large part of exclusion results from social distance
caused by lack of knowledge and understanding about minority communities. Finding spaces to
break these information barriers would go a long way in reducing the hostilities and insecurities that
exist.
3.12.4.1 Interventions
There is a need for opening of schools in Muslim concentrated neighborhoods. For sensitizing on
the issues of cultural and religious diversity especially in relation to Muslims, teachers should be
provided with context specific special training. There should be adequate representation of Muslim
parents in the SMC.
3.12.5 Children belonging to most under-privileged groups:
The Integrated Scheme recognises the hierarchies among the poor. There are the groups which not
only the most deprived and exploited, but also quite neglected for which they deserve a special
priority and focused action. Under the integrated scheme, all functionaries will have to carefully
assess their needs and then plan context specific, innovative integrated interventions to make
tangible progress in eliminating exclusion of children belonging to these groups. The groups which
have been classified among the most disadvantaged groups are-urban deprived children, child
labour, particularly bonded child labour, domestic workers including children in ecologically
deprived area where they are required to fetch fuel, water, fodder and do other household chores,
children in very poor slum communities and uprooted urban habitations, children of families of
scavengers and other such stigmatised professions, children of itinerant or seasonal labour who have
mobile and transient lifestyle like construction workers, road workers and workers on large
construction sites, children of landless agriculture labourer, nomadic communities and pastoralists,
forests dwellers and tribals in the remote areas and children residing in remote desert hamlets,
children in areas affected by left wing extremism, children of sex workers, children/Parents of
AIDS affected, and transgender children etc.
A major issue concerning children in extremely difficult circumstances is sheer lack of their voice
due to their alienation from community and little representation in agencies and forums like the
SMC, Parent Teacher Association (PTA) or Village Education Committee (VEC). The Integrated
Scheme would make efforts to address these issues by creating advocacy for children’s right to
participation, by supporting the formation of support groups for children’s collectives, and, by
encouraging efforts to accommodate their voices in planning, implementation and monitoring of
interventions and strategies.
Situation analysis and interventions for some of the largest among the aforesaid groups of most
underprivileged children i.e. children affected from migration, the urban deprived children, children
DRAFT DOCUMENT
54
in areas affected by left wing extremism, and, children termed as “excluded among the excluded”,
have been discussed in the following paragraphs.
3.12.6 Education of children affected by migration:
To address the issue of seasonal migration for varying periods for work in brick kilns, agriculture,
sugarcane harvesting, construction, stone quarrying, salt pans etc. and its adverse effect on
education of children who migrate with or without other members of the family, the Integrated
Scheme on School Education encourages identification of districts, blocks and villages/cities or
towns from where or to which there is a high incidence of migration.
Special Training strategies for these children would require very meticulous planning. Some
strategies can be developed on the following ideas: (a) seasonal hostels or residential camps to
retain children in the sending villages/urban habitat during the period of migration, (b)
transportation facility to and from the school in the vicinity of the worksite, and if it is not practical
then work-site schools should be provided at the location where migrant families are engaged in
work, and, (c) strategies for tracking of children through migration cards / other records to enable
continuity in their education before, during and after the migration.
Since migration takes place across districts and states, it would be necessary for sending and
receiving districts and States to collaborate with each other to ensure continuity of education of
such children and by other means such as providing appropriate textbooks, teachers who can teach
in the language in which children have been receiving education.
The areas of high incidence of migration need to be identified and strategies for education of
seasonally migrating children may be included in State plans.
3.12.7 Urban Deprived Children:
The Integrated Scheme will focus on the problem of schooling of disadvantaged children in urban
areas like the street children, the education of children who are rag pickers, homeless children,
children whose parents are engaged in professions that makes children's education difficult,
education of children living in urban working class slums, children who are working in industry,
children working in households, children at tea shops, garages etc.
The Integrated Scheme would adopt a more holistic and systemic approach which would necessitate
coordination and convergence of interventions across Departments, local bodies, civil society
organisations and the private sector. The scheme would encourage a diversity of interventions
planned and executed through collaborative and cohesive manner to tackle the unique challenges in
urban areas. This would also require planning distinctively for the urban areas. In either case, this
would require partnership with NGOs, Municipal bodies, etc.
3.12.8 Children in LWE affected areas:
The Integrated Scheme recognises the situation of these children as an alarming and significant
problem and advocates for concrete steps to ameliorate the situation as early as possible. Some
DRAFT DOCUMENT
55
measures to insulate children and their education from the impact of such situation can be taken up
by prohibiting the use of school and other educational facilities for housing police, military or paramilitary forces. The school should be made safe zones by providing adequate security and
emotional support to enable children to come to school and continue with their education
undisturbed. In case security cannot be provided, then making alternative arrangements for all
affected children to enable them to continue their education without a break. These arrangements
could include providing residential schooling facilities or transportation to safer schools to children
from these affected areas.
3.12.9 Transgender children:
There is an urgent need to address the education of transgender children as they face stigma and
discrimination. They face conflicting pressures to conform to gender normative behavior and the
expectations of the society which they are unable to do so. There is a need to create and develop a
reliable national database on transgender children. The schools should create safe supportive school
environment which does not violate their constitutional rights. In this context, the Schools need
develop a plan with transgender students and their parents regarding the use of their names, access
to rest rooms and other spaces corresponding to their gender identity. The curriculum and textbooks
must address the transgender issues and concerns as well as the teachers need to be sensitized about
their issues through continuous teacher training programmes.
3.13 There are many active civil society groups that have gained substantial experience and
knowledge of working with these children. Active involvement of these groups may be sought to
enable their inclusion in the education process. More active engagement of the education
department as well as NCPCR/SCPCR or REPA will be necessary to ensure that these children do
not remain excluded.
3.14 Innovative activities for supplementing mainstream interventions to promote inclusion:
3.14.1 As a first step in the exercise of bringing children from marginalised backgrounds into
school, a careful mapping of these children – who they are and where they live – will have to be
undertaken systematically. Already identified (SFDs)
 14 with concentration of SC, ST and Muslim
communities, a further unpacking of the layers of exclusion that exist within these districts will be
required by the local authorities who have been given the role of identifying out-of-school children
and ensuring that they are brought into school.
3.14. 2 The SMCs envisaged in the RTE Act will play a key role in the mapping exercise as well
as in ensuring inclusive strategies in the SDP, the preparation of which has also been entrusted to
them.

14The Special Focus Districts (SFDs) have been identified on the basis of population i.e. 25% and above domination of
SC and ST population, Muslim concentrated districts of 20% Muslim population and above. Besides this, focus would
be given to Left Wing Extremism (LWE) districts identified by Ministry of Home Affairs, including 35 Worst Affected
Districts, Minority concentration districts identified by Ministry of Minority Affairs and districts identified by Niti
Aayog. Priority will be accorded while planning, sanctioning and monitoring interventions to these Districts.
DRAFT DOCUMENT
56
3.14.3 The State/UT may develop context specific interventions to address the problem of
exclusion of girls and children belonging to the marginalised communities and disadvantaged
groups. This will include specific interventions for girls, children of SC, ST and Muslim
communities, urban deprived children, transgender children and other groups of children in difficult
circumstances, such as child labourers, children affected from migration, children without adult
protection, children in conflict with law, etc. All successful interventions so far will serve as
exemplars for preparing such interventions. In addition, need specific innovative interventions will
be articulated and formulated in terms of their objectives, rationale, methodology, timeframe,
expected outcomes and monitoring etc.
3.14.4 The Integrated Scheme would encourage a wide variety of need based, local specific
innovations, context specific innovative intervention for marginalised communities and
disadvantaged groups such as (i) awareness building on child rights and entitlements as per the RTE
Act at the grass-root level (ii) providing avenues and creating forums for encouraging the voice of
children as key stakeholders in the education system (iii) viable interventions to promote enrolment
and retention (iv) innovative strategies for special training for most disadvantaged children (v)
forming support groups and safety nets for children without adult protection, homeless children,
children working as domestic help, child beggars and other groups of children in extremely difficult
circumstances (vi) strengthening of pre-school centres and support in capacity building of
Anganwadi workers (vii) community mobilisation and capacity building to facilitate preparation of
school development plan (viii) community based monitoring of teacher and student attendance,
child participation and protection of their rights and (ix) building a congenial learning environment
inside and outside the school.
3.15 Interventions for Gender and Social Equity:
In order to implement the gender and equity dimensions of School Education, the new
Integrated Scheme will focus on the following issues:
3.15.1Training and academic support:
(i) As the clear aim of the Integrated Scheme is to have a gender sensitive, nondiscriminatory classroom that is free of corporal punishment and mental harassment,
there is a need to bring about substantial improvement in the curricular design and
quality of teacher training. Gender and social inclusion concerns, as an integral part
of pre-service, in-service and induction training by all providers, should form a core
aspect of the training curriculum of DIETs and other Teacher Education Institutions.
Gender and social equity, should also be integral to the subject-specific content. Inservice training programmes and modules developed by the states may be revised
and redeveloped, if needed. Mechanisms to monitor the effectiveness of such
training in leading to a more egalitarian classroom would need to be put in place.
(ii) In order to take what one has learnt during training into the classroom, there is need
for providing ongoing support and monitoring. DIETs, BRCs and CRCs are playing
this role. However, the quality of support provided by these institutions needs to
improve. Thus, capacity building of DIETs, BRCs and CRCs will be a prime focus
DRAFT DOCUMENT
57
in the context of gender and social equity as well. The support of experienced
organisations would come in handy in this effort.
3.15.2Curriculum and classroom practices
(i) National Curriculum Framework (NCF) 2005 provides a framework for revising the
syllabi, textbooks, teacher-training and assessment, especially in relation to
classroom experience of children belonging to SC, ST and minorities, girls in all
social categories, and children with special needs. Efforts should be made by all
States/UTs to undertake reform processes based on the NCF-2005.
(ii) It is equally important to see how inequalities operate at the level of everyday
classroom practices (referred to as the ‘hidden curriculum’). Some crucial aspects of
the ‘hidden curriculum’ in schools would be: classroom arrangement (who sits
where), differential task assignment (reinforcing that SC girls undertake the
‘domestic’ tasks (sweeping, cleaning extra-curricular activities and types of play etc.,
subject choice (often girls or children from SC families are discouraged from taking
Mathematics and Science subjects), language used by teachers and peers in the
school environment etc. It is, therefore, important to make explicit different aspects
of the ‘hidden curriculum’ and then undertake sensitisation measures to work on
these issues. Sexual violence and abuse in and around school needs to be addressed
in a holistic manner, which involves sensitization of all teachers administrative staff
and support staff. Boys need to be confronted with patriarchy and masculinity.
Sensitisation may not be enough and classroom practices would need to be
monitored, and for this protocols and grievance redressal mechanisms should be
established at the school and other levels. School auditing from gender perspective
should be done on regular basis. Bringing about change in these realms is extremely
difficult as they are based on deeply entrenched beliefs and attitudes, and therefore
need to be worked on a sustained basis.
(iii) With regard to Special Training to support age-appropriate enrolment, appropriate
curriculum would have to be developed. As a majority of the children who would be
availing this would be girls, and children belonging to disadvantaged groups and
weaker sections, the pedagogy used should be gender sensitive and flexible. The
mainstreamed children would require continued support to keep pace with other
children and to hold their own in the face of subtle discrimination.
(iv) Non-government and other organisations and individuals with relevant experience
may be involved to play the role of resource organisations/persons for
mainstreaming gender issues and for developing appropriate curricula, teaching
learning materials, gender informed pedagogies and teacher training for KGBV and
training of BRC, CRC etc.
3.16 Monitoring Gender and social inclusion provisions:
Issues of gender and social exclusion require careful monitoring. Under the Integrated Scheme,
monitoring and accountability mechanisms would be evolved and strengthened at different levels.
Gender auditing of learning institutions should be carried out periodically.
DRAFT DOCUMENT
58
The RTE Act stipulates that 50% of the parents in the SMC will be women. However, for these
women to function effectively and for them to be able to address and monitor gender issues and to
include them in school development plans, capacity building inputs being provided to them should
include a strong element of gender sensitization. Raising issues of discrimination in a community
context where social, gender and caste hierarchies operate at many levels is a difficult task and
persons entrusted to do so will have to be empowered and supported in this process. Similar training
programmes can be thought of for Panchayati Raj Institutions (PRIs).
Social audits should also report on the practices inside the school and classrooms, and detection of
gender based discrimination should become an integral part of social audit processes in schools
under different management systems.
DRAFT DOCUMENT
59
Strategy for safety and security of Girls
There are several issues pertaining to safety & security of Girls residing in KGBVs. Most
of the States have developed guidelines /instructions about the non-negotiable operational
aspects of the KGBVs to provide safe environment for girls so that they may pursue and
complete their education in a fearless environment. Some of the aspects of safety &
security of Girls are as follows:
• The KGBV staff should collaborate with local health authorities and should have
contact numbers of the local doctors in case of need and also empanel the Doctor to
regularly visit the KGBVs.
• In case of any emergency, they must have a plan ready. Mock drills should be
conducted to train them. If possible disaster management people be involved in this
process.
• No male family member or any other visitor is allowed to enter the dormitories of the
girls.
• Sensitive and trained woman wardens, teachers and staff should be deputed in the
KGBVs.
• Appoint only female warden, teachers and staff in the KGBVs
• Self defence mechanism should be given due focus - Karate training is providing to
KGBV students to boost their moral and self-confidence.
• Watchman is to be provided in all KGBVs for 24 hours.
• Awareness programme for adolescent girls needs to be conducted.
• School Development and Monitoring Committee’s/local Communities needs to be
involved in providing Safety and Security to KGBV’s Girls.
• Incinerators should be set up in KGBVs for the disposal of organic waste
• Guest register to be maintained in every KGBV wherein the detail of each visitor is
recorded.
• The school authorities should get the name/s along with the photos of the family
members of the girl child authorized to visit the girl in hostel and paste their
particulars in a register.
• Develop counselling programs wherein girls should be taken in confidence so that
they can report their problems if any whether it is related to health, personal matters
or anything relating to KGBV.
• Provision of safe drinking water and sanitation facilities. Strict punishment to be
given for anyone found guilty in case of sexual harassment and matter may be
reported immediately to higher authorities.
DRAFT DOCUMENT
60
CHAPTER 4 – INCLUSION OF CHILDREN WITH SPECIAL NEEDS IN EDUCATION
4.1 Background and Rationale
4.1.1 The NPE, 1986 and POA, 1992 gives the basic policy framework for education,
emphasizing on correcting the existing inequalities, it stresses on reducing dropout rates, improving
learning achievements and expanding access to students who have not had an easy opportunity to be
a part of the general system. The NPE, 1986 envisaged some measures for integrating of children
with physical and mental handicap with the general community as equal partners, preparing them
for their normal growth and development and enabling them to face life with courage and
confidence.
4.1.2 India has also been signatory to international declarations like the Salamanca Statement and
framework for action on special needs education (1994) and Biwako Millennium Framework for
Action (2002) and the UN Convention on the Rights of Persons with Disabilities, 2006 that
emphasize the need for fundamental educational policy shifts to enable general schools to include
children with disabilities. The NCF-2005 recommends making the curriculum flexible and
appropriate to accommodate the diversity of school children including those with disabilities in both
cognitive and non-cognitive areas.
4.1.3 The Centrally Sponsored Scheme of Integrated Education for the Disabled Children was
introduced in 1992 with a view to providing educational opportunities for children with disabilities
in general schools, to facilitate their retention in the schools system. It provided for facilities to
students with disabilities including expenses on books and stationery, expenses on uniforms,
transport allowance, reader allowance, escort allowance, hostel accommodation and actual cost for
equipments. The scheme also supported the appointment of special teachers, provision for resource
rooms and removal of architectural barriers in schools.
4.1.4 The Centrally Sponsored Scheme of SSA of 2001 had set time-bound targets for the
achievements of UEE. With “zero rejection’ as its cornerstone, the programme provided support for
the inclusion of children with disabilities in general schools at the elementary level. The SSA norms
were further strengthened by the RTE Act, 2009 which talks about free and compulsory elementary
education to children without any discrimination on the basis of caste, gender, disability etc.
4.1.5 While the RTE Act mandates inclusion of CWSN, some may be unable to attend school
despite specific interventions designed for their education. The amendment of RTE Act (in August
2012) has included CWSN in the definition of disadvantaged groups. It includes children with
severe - multiple disabilities with the right to opt for Home Based Education (HBE), thus creating
an enabling environment for all children.
4.1.7 As SSA supported inclusion of children with special needs at the elementary education
level, a need was felt for a scheme for the disabled children at secondary stage. The IEDSS scheme
was, therefore implemented to enable all children and young persons with disabilities to have access
to secondary education and to improve their enrolment, retention and achievement in the general
education system. Under the scheme every school was proposed to be made disabled-friendly. The
DRAFT DOCUMENT
61
Centrally Sponsored IEDSS Scheme aimed at enabling all students with disabilities completing
eight years of elementary schooling an opportunity to complete four years of secondary schooling
(classes IX to XII) in an inclusive and enabling environment and provided educational opportunities
and facilities to students with disabilities in the general education system at the secondary level
(classes IX to XII).
4.1.8 Samagra Shiksha aims to look at education of all children including CWSN in a
continuum from pre-school to class XII. The scheme will cover all children with special needs
with one or more disabilities as mentioned in the schedule of disabilities of the Right of the
Persons with Disabilities (RPwD) Act, 201615 studying in Government, Government-aided and
local body schools.
4.1.9 The scheme stresses on working in convergence with all the line Departments/
Ministries and intends to provide relevant holistic support for effective and appropriate
services for education of CWSN.
4.1.10 The objectives of the scheme are:
• To enable all children and young persons with disabilities to have access to inclusive
education and improve their enrolment, retention and achievement in the general education
system.
• Identification of children with disabilities at the school level and assessment of her/his
educational needs.
• Provision of aids and appliance and assistive devices, to the children with special needs as
per requirement.
• Removal of architectural barriers in schools so that students with disability have access to
classrooms, laboratories, libraries and toilets in the school.
• Supplying appropriate teaching learning materials, medical facilities, vocational training
support, guidance and counselling services and therapeutic services to children with special
needs as per their requirement in convergence with line departments.
• General school teachers will be sensitized and trained to teach and involve children with
special needs in the general classroom. For existing special educators, capacity building
programmes will be undertaken.
• CWSN will have access to support services through special educators, establishment of
resource rooms, vocational education, therapeutic services and counselling.

15 http://www.disabilityaffairs.gov.in/upload/uploadfiles/files/RPWD%20ACT%202016.pdf
DRAFT DOCUMENT
62

THE GAZETTE OF INDIA EXTRAORDINARY
THE RIGHTS OF PERSONS WITH DISABILITIES ACT, 2016
CHAPTER III
EDUCATION
16. The appropriate Government and the local authorities shall endeavour that all educational institutions funded or
recognised by them provide inclusive education to the children with disabilities and towards that end shall—
(i) admit them without discrimination and provide education and opportunities for sports and recreation activities
equally with others;
(ii) make building, campus and various facilities accessible;
(iii) provide reasonable accommodation according to the individual’s requirements;
(iv) provide necessary support individualised or otherwise in environments that maximise academic and social
development consistent with the goal of full inclusion;
(v) ensure that the education to persons who are blind or deaf or both is imparted in the most appropriate languages
and modes and means of communication;
(vi) detect specific learning disabilities in children at the earliest and take suitable pedagogical and other measures
to overcome them;
(vii) monitor participation, progress in terms of attainment levels and completion of education in respect of every
student with disability;
(viii) provide transportation facilities to the children with disabilities and also the attendant of the children with
disabilities having high support needs.
17. The appropriate Government and the local authorities shall take the following measures for the purpose of section 16,
namely:—
(a) to conduct survey of school going children in every five years for identifying children with disabilities,
ascertaining their special needs and the extent to which these are being met: Provided that the first survey shall be
conducted within a period of two years from the date of commencement of this Act;
(b) to establish adequate number of teacher training institutions;
(c) to train and employ teachers, including teachers with disability who are qualified in sign language and Braille
and also teachers who are trained in teaching children with intellectual disability;
(d) to train professionals and staff to support inclusive education at all levels of school education.
(e) to establish adequate number of resource centres to support educational institutions at all levels of school
education;
(f) to promote the use of appropriate augmentative and alternative modes including means and formats of
communication, Braille and sign language to supplement the use of one’s own speech to fulfill the daily
communication needs of persons with speech, communication or language disabilities and enables them to
participate and contribute to their community and society;
(g) to provide books, other learning materials and appropriate assistive devices to students with benchmark
disabilities free of cost up to the age of eighteen years;
(h) to provide scholarships in appropriate cases to students with benchmark disability;
(i) to make suitable modifications in the curriculum and examination system to meet the needs of students with
disabilities such as extra time for completion of examination paper, facility of scribe or amanuensis, exemption
from second and third language courses;
(j) to promote research to improve learning; and
(k) any other measures, as may be required.
DRAFT DOCUMENT
63
4.2 Target Group
4.2.1 The scheme will cover all children from pre-school to senior secondary stage studying in
Government, local body and Government-aided schools, with one or more disabilities as defined
under the Rights of Persons with Disabilities Act (2016) namely:
1. Blindness
2. Low-vision
3. Leprosy Cured persons
4. Hearing Impairment (deaf and hard of hearing)
5. Locomotor Disability
6. Dwarfism
7. Intellectual Disability
8. Mental Illness
9. Autism Spectrum Disorder
10. Cerebral Palsy
11. Muscular Dystrophy
12. Chronic Neurological conditions
13. Specific Learning Disabilities
14. Multiple Sclerosis
15. Speech and Language disability
16. Thalassemia
17. Hemophilia
18. Sickle Cell disease
19. Multiple Disabilities including deaf blindness
20. Acid Attack victim
21. Parkinson's disease
4.2.2 Girls with disabilities will receive special focus and efforts would be made under the scheme to
help them gain access to schools, as also to provide motivation and guidance for developing their
potential.
4.2.3 All the enrolled CWSN will be covered through UDISE/SDMIS and will eventually be linked
with Aadhaar, ultimately facilitating the State/UT to track CWSN of both systems i.e. those that are in
school and those with Home based. The UDISE will have the relevant details of children. Further an
extensive database will be developed which will cover all the particulars of children including the type
of disability, degree of severity, medical needs, emergency contacts and all other relevant details that
will help the School management to cater to the needs of the CWSN.
4.3 Components of the Scheme
The Scheme will include assistance for two kinds of components:
4.3.1 Student oriented component
The student oriented component may be utilized for specified items like:-
(i) Identification and assessment of children with disabilities.
DRAFT DOCUMENT
64
(ii) Provision of aids and appliances, medical services, diagnostic services etc.
(iii) Access to and development of teaching learning material as per requirement etc.
(iv) Provision of facilities like transport/escort facilities for children with severe
disabilities, hostel facilities, scholarship, assistive devices, support staff (readers,
amanuensis) etc.
(v) Provision of large print text book, Braille books and uniform allowance.
(vi) Stipend for Girl Students @ Rs. 200 per month for 10 months to encourage their
participation in the school system for all girls with disabilities studying in Classes-I
to XII.
(vii) The use of ICT to increase access to a vast amount of information not otherwise
available.
(viii) Awareness and motivation camps for increasing enrolment and retention.
(ix) Provision of Home Based Education for children with severe multiple disabilities
with a view to mainstream them in the general education system.
4.3.2 Resource support
For providing resource support to CWSN, the existing human resource appointed under SSA
and RMSA will be rationalized and the remaining vacancies may be filled through fresh
appointment as per the norms provided at Annexure-III. All special educators should be
registered with Rehabilitation Council of India (RCI). These educators should mandatorily
be available for all CWSN including the children with high support needs as well. The
educators may be posted at the block or cluster level or as per the requirement and can
operate in an itinerant mode, covering a group of schools where children with special needs
are enrolled so that each child with special need is adequately covered.
4.4 Key areas of the Inclusive Education Component
Education for CWSN involves multiple aspects above and beyond the financial support.
Many areas have to be looked upon manifestly that will ensure proper implementation and
effective inclusion. The highlights of the components are discussed below.
Key
Areas
Education of
teachers and
other
stakeholders
Curricular
access
Building
synergy with
special
schools
Research &
Development
Social
Access to
CWSN
DRAFT DOCUMENT
65
4.5 Education of teachers and other stakeholders
 Intensive teacher education programme will be undertaken to sensitize and build capacity of
the regular teachers and resource teachers on meeting learning needs of all teachers to provide
quality education to CWSN and improve their learning outcomes. This teacher education
programme will be recurrent at block/cluster levels and integrated with the on-going in-service
teacher education/training schedules in DIETs and other Institutions. Teacher education modules at
SCERT, DIET and BRC level should include suitable components on education of children with
special needs. Training of educational administrators including headmasters, all other staff &
relevant personnel of school education should be regularly organized. Special focus should be given
on mechanisms for safety and security of children with special needs.
4.6 Curricular access
 The curriculum must be inclusive as envisioned in NCF-2005. It should ensure that the same
curriculum be followed for children with and without special needs, but with
adaptations/modifications if required in learning content, teaching learning processes, teaching
learning materials/aids and in evaluation, etc. Provision will be made to provide text books and
curriculum in accessible formats to CWSN.
 Exam reforms need to be made by Central and State Boards for conducting exams of
CWSN. Guidelines issued in this regard by the Department of Disability Affairs are enclosed at
Annexure-IV. The modifications may be made disability specific, (for example, oral exam for
children with specific learning disability, extra time for children with visual impairment, low vision
and cerebral palsy etc). A regular audit of existing textbooks from CWSN lens will be a priority for
an apt curriculum.
4.7 Individualized Educational Plan (IEP)
IEP will be undertaken in context of the RPwD Act, as “Individualized Support” (as
mentioned in Chapter 3 of RPwD Act, 2016). Its implementation will be monitored from time to
time. The Individualized Support should review the effectiveness of various strategies and support
services used by children with special needs periodically, after developing indicators.
4.8 Building synergy with special schools
4.8.1 In case of non-availability of resources required for education of children with special needs
and training of teachers teaching CWSN, assistance from special schools may be taken. These
special schools can work as resource centers for providing resources like development of curricular
materials and TLMs, providing support services to CWSN and training of teachers etc.
4.8.2 In some cases, special schools can also impart special training to CWSN for facilitating age
appropriate placement in the classroom for a specified period of time. NGOs working on education
of children with chronic health impairments like leukemia, heart diseases and cancer etc, may also
provide resource support for pertinent care and health related needs and capacity building of
teachers.
DRAFT DOCUMENT
66
4.9 Research and Development
The Integrated Scheme will encourage research and development activities in all areas of
education of children with special needs including action research, researches to improve learning
of CWSN, especially focusing on children with high support needs (Thalassemia, Hemophilia,
Sickle Cell disease and Chronic neurological conditions etc), eventually leading to concrete
learning outcomes. For this, convergence with different Ministries like Ministry of Health and
Family Welfare, MoWCD, Ministry of Social Justice and Empowerment, Ministry of Sports and
Youth Affairs, private organizations with Corporate Social Responsibility (CSR) funds etc.
4.10 Social Access to CWSN
Ensuring social access to CWSN is a greater challenge as compared to providing physical
access as it requires an in-depth understanding of the various educational needs of CWSN. A very
important dimension of social access is discrimination. CWSN are subjected to many forms of
discrimination. Teachers and peers have a very important role to play in this context. Social access
could include the following:
i. Parental training
ii. Peer sensitization
iii. Awareness building of different stakeholders across all levels
iv. Special emphasis will be given to education of girls with disability
4.11 Monitoring & Evaluation:
 On-going monitoring and evaluation should be carried out to refine the programme from
time to time. For this, appropriate monitoring mechanisms and tools are to be devised at every level
and field tested at regular intervals.
DRAFT DOCUMENT
67
ANNEXURE-III
GUIDELINES FOR APPOINTMENT OF SPECIAL EDUCATORS
1. Minimum Educational Qualifications for becoming an Educator for Classes preschoolV (Pre School to Primary Stage)
(a) Classes I-V: Senior Secondary (or its equivalent) with at least 50% marks and 2-year
Diploma in Education (Special Education).
(b) Pass in the Teacher Eligibility Test (TET), to be conducted by the appropriate
Government in accordance with the Guidelines framed by the NCTE for the purpose.
2. Minimum Qualifications for becoming an Educator for Classes VI-VIII (Elementary
stage)
(a) Graduation with at least 50% marks and 1-year B.Ed. (Special Education)16

Or
Graduation with at least 50% marks and 2- year B. Ed. (Special Education)17
(b) Pass in Teacher Eligibility Test (TET), to be conducted by the appropriate Government
in accordance with the Guidelines framed by the NCTE for the purpose.
3. Minimum Qualifications for becoming an Educator for Classes IX-XII: (Secondary
stage)
• All Special Educators must be registered with the Rehabilitation Council of India
(RCI).
• Educators with Qualifications in single disability area will be encouraged to specialize
in other disability areas to take care of a wide range of diversities in a general school.
• Relaxation up to 5% in the qualifying marks in the minimum Educational
Qualification for eligibility shall be allowed to the candidates belonging to reserved
categories, such as SC/ST/OBC/Differently abled.
• Training to be undergone: A person with D. Ed. (Special Education) or B. Ed. (Special
Education) qualification shall undergo, after appointment an NCTE recognized 6-
month Special Programme in Elementary Education.

16 For candidates who have graduated in B. Ed. (Special Education) in/before 2015-16 i.e. the 1 year course.
17 For candidates who have graduated in B. Ed. (Special Education) after 2015-16 i.e. the 2 years course (in regular or
distance mode).
DRAFT DOCUMENT
68
ANNEXURE-IV
GUIDELINES FOR CONDUCTING WRITTEN EXAMINATION FOR PERSONS WITH
DISABILITIES

DRAFT DOCUMENT
69

DRAFT DOCUMENT
70
DRAFT DOCUMENT
71
CHAPTER 5 – QUALITY INTERVENTIONS
5.1 The Context
School Education is envisaged as a holistic and convergent programme aimed at providing
quality education across the wide spectrum of schools, spanning from pre-school to senior
secondary classes. NPE 1968 and 1986 (modified in 1992) and POA 1992 have emphasised upon
the strengthening of National System of Education for providing education of comparable quality to
all. In consonance with the mandate of education policies and demands from the society, NCF is
brought out from time to time to further improve quality of school education in our country. Till
now, four curriculum frameworks i.e., NCF 1975, 1986, 2000 and 2005 have been brought out by
the NCERT.
The NCF-2005 suggests following guiding principles for the holistic development of a
learner through school education:
• Connecting knowledge to life outside the school;
• Ensuring that learning is shifted away from rote methods;
• Enriching the curriculum to provide for overall development of children rather than
remain textbook centric;
• Making examinations more flexible and integrated into classroom life and,
• Nurturing an over-riding identity informed by caring concerns within the democratic
polity of the country.
Section 29 of the RTE Act, 2009 provides for:
(1) The curriculum and the evaluation procedure for elementary education shall be laid
down by an academic authority to be specified by the appropriate Government by
notification.
(2) The academic authority, while laying down the curriculum and the evaluation procedure
under sub-section (1), shall take into consideration the following:
a. conformity with the values enshrined in the Constitution;
b. all round development of the child;
c. building up child’s knowledge, potentiality and talent;
d. development of physical and mental abilities to the fullest extent;
e. learning through activities, discovery and exploration in a child friendly and childcentred manner;
f. medium of instructions shall, as far as practicable, be in child’s mother-tongue;
g. making the child free of fear, trauma and anxiety and helping the child to express views
freely;
h. comprehensive and continuous evaluation of child’s understanding of knowledge and his
or her ability to apply the same.’
NCF-2005 has been adopted as the curriculum for the purposes of the RTE Act, 2009.
Over the years, due to the efforts made through the Schemes of SSA, RMSA and TE, there
has been significant spatial and numerical expansion of elementary and secondary schools and
DRAFT DOCUMENT
72
improvement in teacher education institutions in the country, however, the quality of learning
achievement still remains a major challenge. Reasons may be attributed to stage-specific
interventions, missing linkages with pre-school as well as senior secondary, lack of defined learning
outcomes, etc. The quest for quality has acquired a new urgency in the present day.
NCERT has been periodically conducting the large-scale surveys of learning achievement
i.e. National Achievement Survey (NAS) in government and government aided schools at grade III,
V and VIII in different curricular areas since 2001 with an interval of three years. For class X, the
first cycle was conducted in 2015. NCERT has been implementing these surveys on sample basis at
the State/UT level to provide evidence on health of education system and learning levels of children
in key curricular areas in these classes. Though the NAS results were shared with the States/UTs
through different modes of communication, the findings of these learning achievement surveys
were not optimized in planning, remedial measures, teacher training and other related activities.
These factors necessitated the need for drafting Learning Outcomes.
Grade-wise and Subject-wise Learning Outcomes (LOs) for elementary stage have been
defined at the national level, with inputs from stake-holders at state and district levels, as well as
members of the public. The Central RTE Rules have been amended on 20th February, 2017 to
include reference to grade wise and subject wise Learning Outcomes. The Learning Outcomes for
each class will not only help teachers to focus on teaching-learning process, but also facilitate
parents/ guardians, community members and state functionaries in their role towards ensuring
quality education in schools throughout the nation.
The NAS (2017) was administered for classes III, V and VIII on 13th November, 2017 on
nearly 2.2 million children from 110,000 schools across all States and UTs in the country. The test
instruments of NAS (2017) were competency based and linked to Learning Outcomes recently
developed by NCERT. The second cycle for class X was held on 5th February 2018 covering nearly
1.6 million children from 45000 schools that included private schools also.
5.2 Defining Quality in Education
Quality is more a systemic trait rather than only a feature of instruction or attainment. As an
overarching attribute, quality expresses the system’s capacity to reform itself for enhancing its
ability to address its own weakness and to develop new capabilities. Quality is not merely a
measure of efficiency; it also has a value dimension. Attempt to improve quality of education will
succeed only if it goes hand in hand with steps to promote equality and social justice. In the context
of education, two principles characterize most attempts to define quality: firstly learners’ cognitive
development as the major explicit objective and secondly education’s role in promoting values and
attitudes of responsible citizenship and in nurturing creative and emotional development. Keeping
this in view, the new scheme focuses on holistic development of learners in a system of schools in
continuum. These two principles of quality in education clearly direct us towards reducing gap
between the intended, transacted and achieved curriculum. Inverse relationship exists between this
gap and quality of education. Our efforts for reducing the gap requires provision of adequate inputs
which include, quality curriculum, effective teachers, realistic assessment in terms of learning
progress and adequate career guidance and counselling provisions for adolescents. It is also
DRAFT DOCUMENT
73
essential to gear up processes with in-built monitoring and research components viz; curriculum
reform, reform in teacher education, examination and ensuring participation of all stakeholders.
Quality will essentially carry an overarching approach of equity. This will require schools to be
sufficiently equipped and prepared to address to the diverse learning needs of all children with
special focus on children belonging to SC, ST and Minorities, CWSN as well as girls.
 Another dimension of quality is to address the rural-urban divide and regional disparities.
Specific quality intervention in isolation with others will not make much impact on the system.
Planning for quality needs to reflect on the following aspects and accordingly decisions need to be
taken as to which aspect needs more attention:
5.2.1 Learning and Assessment
Learning operates in a continuum and cannot be divided into pieces or seen as ‘complete’ if
one unit/concept/chapter is taught. Therefore, perspectives of examination/test results as indicator
of quality need to be revisited in the light of Learning Outcomes. Assessment need to be seen as an
integral part of pedagogy which has the primary role of facilitating the teacher and learner to devise
more effective learning strategies. Also every teacher needs to be made aware of learners’
indication of continuous learning i.e., learning outcomes and modify her/his pedagogic processes as
per learners’ needs.
5.2.2 Curricular Material
The quality dimension also needs to be examined from the point of view of the experience
designed for the child in terms of knowledge and skills. Assumptions about the nature of knowledge
and the child’s own nature shape the school ethos and the approaches used by those who prepare
curricular material and by teachers as well. Therefore, the representation of knowledge in curricular
material needs to be viewed from the larger perspective of challenges facing humanity and the
nation today.
Linkages between pre-school, primary, upper primary, secondary and senior secondary
levels in the processes of designing and preparing curricular material are vital. Also, setting up of
structures that enable school teachers and subject experts drawn from institutions of higher learning
to work together for revision of curriculum and development of learning material would help in
designing relevant curriculum. The system also needs adequate advocacy and dissemination
mechanisms for curricular perspectives, which need to be put in place for ensuring quality.
5.2.3 Systemic Coordination and Synergies
Different agencies such as SCERT, Boards, DIETs, CTEs, IASEs and Universities have
been working in isolation from one another. Examination boards are not informed on the change in
the perspectives of state curricular material, therefore, they believe in the old/rigid information
seeking questions, which is detrimental to the constructivist pedagogy. Therefore, systemic
coordination and synergies among all the concerned agencies would make the assessment system
more efficient. Further creation of spaces where local-level representative institutions to work
closely with teachers to contribute to the enhancement of efficiency may be considered.
DRAFT DOCUMENT
74
5.2.4 Capacity Building and Teacher Training
Although capacity building of various concerned stakeholders and teacher training have
always been seen as an important factor for improving quality, yet due to lack of resource pool,
quality perspectives do not get implemented in true spirit. Creating a resource pool to address
different aspect of quality and disseminating its perspective, mentoring for quality across the state is
needed.
Quality education is a comprehensive term that includes learners, teachers, teachinglearning process, learning environment, curriculum, pedagogy, learning outcomes, assessment, etc.
For ensuring quality, it is required that everyone concerned with various dimensions of enhancing
quality have to take cognizance of the following:
• Learners are active participants rather than passive recipients. They are ready to learn
and participate actively in the learning process and construct their own knowledge;
• Teachers are facilitators rather than instructors. They are motivated to guide their
children at every step. They identify the learning needs of children and use a variety of
pedagogical practices that are appropriate for the content and steer the children’s
learning towards their goals;
• The environment in a classroom is healthy, safe and have proper infrastructure facilities
conducive for learning;
• Curriculum is class specific, stage specific, socially relevant, unbiased, gender sensitive,
and has content that upholds the principles enshrined in the Constitution and one that
resonates with our values and ethos. It is to maintain the coherence as per the systemic
continuum;
• The pedagogical processes or the methodology adapted reflect the paradigm shift from
teacher centric to child centric. A variety of methods are adopted suitable for the topic
and also to the contextual needs;
• The teaching learning process is dynamic, with active participation of students, use of
ICT and other digital resources that transform the classroom learning to move beyond
the classroom walls, and
• The outcomes are aligned with the aims and objectives of education and not just limited
to acquisition of knowledge. Apart from theoretical knowledge, the acquisition of basic
skills of literacy, numeracy, life skills, values like peace, tolerance, knowledge in such
areas as gender, health, nutrition, disease prevention are taken into consideration.
Careful consideration of above elements before planning school activities will help
visualising a quality classroom.
5.3 Vision of a Quality Classroom
A quality classroom is an interactive place buzzing with activity that facilitates quality
learning. It is a place where children do their work spontaneously and confidently without inhibition
and where they construct their own knowledge. Here, children have the freedom to explore,
experiment, invent and innovate, reflect and react. The teacher assumes a multi-dimensional role
that of a facilitator, classroom manager, a guide, a counselor and above all a co-partner in
knowledge construction. It provides scope for the use of a variety of strategies for achieving the
Learning Outcomes. The classroom comes alive when children are engaged in debates, discussions
DRAFT DOCUMENT
75
and other activities. They work individually as well as in group. In a quality classroom, there is no
bias on the grounds of class, gender, caste or community and where all children learn confidently
through healthy inter-personal relationships between learners and teachers. It also permits the
parents and community members share and discuss problems of learners with the teacher and
thereby devise remedial measures.
For ensuring quality in classrooms, education is to be understood as a complex system that
needs a multi-pronged approach for its improvement. These dimensions are not mutually exclusive;
rather they are intertwined and are completing and complementing one another.
5.4 Quality Integration Mechanisms
An integrated and holistic school development plan may be developed which will facilitate a
comprehensive strategy for quality improvement from pre-school to senior secondary level. In order
to enable quality, a wide spectrum of interventions is being provided to improve the teachinglearning process in schools. The scheme is committed to supporting and empowering individual
students and enabling lifelong learning, vocational efficiency and employability. This calls for a
shift in approach from ‘stage specific’ to a ‘whole school’ based planning and implementation. The
attempt is to ensure optimal synergies in implementation and efficient use of available and better
resources including human resource capacities. States and UTs are expected to bring a single plan
for the entire school education (from Pre-school to Senior Secondary) by treating school as a
continuum and education as per the SDG-4 that is to ensure inclusive and equitable quality
education and promoting lifelong learning opportunities for all.
The approach here is to put together implementation strategies that can be adopted by the
States and UTs with focus on defining outcomes / deliverables and mapping it to the impact that is
tangible with reference to educational outcomes (indicators).The State/UT should explore
convergence and dovetailing with various departments as well as institutions for more efficient
planning and implementation of the quality interventions.
5.5 Financial Support for Major Quality Interventions
Under the Integrated Scheme for School Education, support is provided for various
interventions related to improvement in quality of Education. This will be allocated among
States/UTs on the basis of performance (example NAS results, Gender parity Index (GPI), Gross
Enrolment Ration (GER) for ST children etc.) and undertaking of advocated policy interventions
such as rural tenure policy, separate cadre for Head Masters, implementation of Shaala Siddhi etc.
Support would be available for improvement in quality of education through strengthening
of Teacher Education Institutions including SCERTs and DIETs and teacher training, in-service and
pre- service, professional development of teachers, support for the National Teacher Platform –
DIKSHA, school leadership training and academic support through BRCs and CRCs.
After working out the allocations on the above formula, States/UTs will be given flexibility
to prioritize the components, while preparing an Annual Plan under the broad interventions.
DRAFT DOCUMENT
76
Since our objective of holistic development of child demands our focussed interventions
across cognitive, psycho-motor and affective aspects of education in a balanced way, the guidelines
include major quality interventions under the following heads.
5.5.1 Core Quality Interventions
5.5.1.1 Teacher Training
 The Integrated scheme visualises teacher as a capable facilitator, who motivates children to
construct their own knowledge. The teacher should be aware of progressive pedagogy and the
nature and experiences of children from various social and cultural backgrounds. Moreover,
teachers should be committed to equity and social justice, aware about child entitlements and
convinced that all children can learn well if provided education of equitable quality.
The new scheme will provide support to both induction and in-service teacher training
through SCERTs as per the specified norms. SCERT as the academic authority will develop a
consolidated calendar of annual in-service training for elementary, secondary and senior secondary
school teachers and also for teacher educators in SCERTs, DIETs and other Teacher Education
Institutions. The comprehensive training calendar will include training of teachers, head
teachers/principals, induction training for the newly recruited teachers, school leadership training
with support from National Institute on Educational Planning and Administration (NIEPA), training
of educational administrators, training of Resource Persons, subject- specific and theme-specific
training, etc., with the support of NCERT. The calendar will include details about the dates,
duration, venue and number of participants for the training programmes.
SCERTs will take the inputs from all the DIETs in the State/UT for formulating this annual
calendar. All the DIETs may be informed about taking inputs and needs from the BRCs and CRCs
with respect to training programmes and communicate the same to the SCERTs. Annual calendar
for training will avoid duplicity and repetition in the programmes and will also help in developing
and updating Management Information System of training in the State/UT which can also be
utilized by DIKSHA.
Along with the academic calendar, SCERT will prepare modules for teacher training, orient
the Resource Persons for teacher training, conduct training programmes in collaboration with SPO,
DIETs, BRCs and other related agencies and facilitate specialised courses for school teachers for
their professional development and improvement of the levels of learning. The CTEs and IASEs are
to be linked to the system to provide in-service training to school teachers at different levels as per
the modified role and responsibility of SCERT under the integrated scheme.
5.5.1.2 Learning Outcomes (LOs)
The RTE Act 2009 and the SDGs have indicated that for getting meaningful benchmark for
progress on education in the country, rigorous and credible standardized assessment of student
learning is required. In pursuance to, LOs for classes I-VIII along with pedagogic processes have
been developed class wise in subjects such as Environmental Studies, Science, Mathematics, Social
DRAFT DOCUMENT
77
Sciences, Hindi, English and Urdu. The reference to LOs has been included in the Central Rules of
the RTE Act, 2009 on 20th February, 2017 as:.
 “(c) prepare class-wise, subject-wise learning outcomes for all elementary classes; and
(d) prepare guidelines for putting into practice continuous and comprehensive evaluation
to achieve the defined learning outcomes”.
All States and UTs have also included reference to Learning Outcomes in their respective
State RTE Rules. They are required to translate Learning Outcomes document in their regional
languages and circulate the same to all the schools. The State/UTs will be using the explicitly
defined Learning Outcomes to guide and ensure the responsibility and accountability of different
stakeholders including administrators, school heads, teachers and parents for their accomplishment.
Though these Learning Outcomes have been prepared keeping in view the developmental
perspective of desired competencies in the child at the particular stage and age and hence are not
textbook based, these are not prescriptive and may be contextualised as per the local-specific
requirements without incorporating much deviation from the learning outcomes developed at the
National level. In view of popularising and disseminating these Learning Outcomes to the teachers
at the grass root level, the required training programmes for Key Resources Persons and teachers
need to be organised at the state, district and block levels. It also calls for developing a continuous
support mechanism for providing on-site support to teachers to use multiple pedagogies for students
to achieve their learning outcomes.
5.5.1.3 Achievement Survey at National and State Level
The basic objective of NAS is to study the achievement level of students in different
subjects at different grade levels and also with respect to location/area, gender and social groups.
NAS takes a representative sample of all districts of the country. The NAS provides reliable data
about students’ achievement as it administers standardized tests to students of different
classes. NAS collects information about relevant background factors related to the school
environment, instructional practices, the home backgrounds of students, teachers’ qualification, etc.
NAS data gives policy makers, curriculum specialists, researchers and other stake holders a
‘snapshot’ of what students know and can do in key subjects at a particular point in time. Findings
from the NAS will be used as inputs in policy, planning and pedagogical interventions to improve
student learning outcomes.
The NAS (2017) was administered for classes III, V and VIII on 13th November, 2017 on
nearly 2.2 million children from 110,000 schools across all States and UTs in the country. The test
instruments of NAS (2017) were competency based and linked to Learning Outcomes recently
developed by NCERT. The second cycle for class X was held on 5th February 2018 covering nearly
1.6 million children from 45000 schools that included private schools also.
The NAS 2017 will generate detailed report at the district level on the percentage of students
achieving learning outcomes. This will help the districts to develop evidence based programmes for
improving the quality of education. Factors/reasons behind low learning levels will be identified
after interaction with different stakeholders. Accordingly, detailed pedagogical support/training for
DRAFT DOCUMENT
78
teachers on teaching methods and learning strategies will be worked out to improve the learning
outcomes. It is expected that a framework of intervention developed would help to improve the
quality of teaching and learning in schools. The designing and implementation of these
interventions is envisaged to include in its ambit the school leaders, teachers and the whole network
of officials at clusters, blocks, DIETs, SCERT and the Directorate of Education at different levels in
the States/UTs.
For improving overall learning levels of school education in the country, Item Bank will be
developed for all subjects and classes covered under NAS and will be supported by ICT based
learning resources.The learning outcome oriented assessment will not only help to make the shift in
the focus of student learning from content to competencies, it will also help the teachers to divert
their teaching-learning in the desired manner and make other stakeholders especially the
parents/guardians, SMC members, community and the state functionaries responsible for ensuring
quality education.. The Learning Outcomes defined explicitly will help to guide and ensure the
responsibility and accountability of different stakeholders.
NAS will be conducted by NCERT under the guidance of MHRD periodically. State/UTs
would be providing logistical and manpower support to conduct NAS. State/UTs may also conduct
their own achievement survey (State Achievement Survey) to get the micro level picture of the
learning level of students in a particular district or a block to go further deeper if required.
5.5.1.4 Composite School Grant
As a support for quality improvement, composite school grant is sanctioned on an annual
basis to all Government Schools. The objective is to utilize this support to provide conducive
learning environment in schools. School grant is primarily meant for the replacement of nonfunctional school equipment and for other recurring costs, such as consumables, play material,
newspapers, electricity charges, internet, water, teaching aids etc. The grant may also be used to
provide annual maintenance and repair of existing school building, toilets and other facilities to
upkeep the infrastructure in good condition. The same may be utilized for promoting Swachh
Bharat Campaign and also for involving elements of community contribution.
5.5.1.5 Library
Library is an essential component of the school, providing not only resource for learning,
but also for strengthening the idea of reading for pleasure, recreation and further deepening of
knowledge and imagination. Accordingly, it will have books, pictorials, newspapers, journals,
magazines, reference books, biographies, autobiographies, dictionaries, encyclopaedias, audiovisual material, etc. as well as access to information technology and digital resources. Training of
teachers in library management and its usage will be integrated within the teacher training
programmes. Efforts will be made for involving SMC and community for enriching the libraries.
The library resources are also to be utilised for facilitating reading as the process of reading
with comprehension in the light of Padhe Bharat Badhe Bharat (PBBB). Process of reading from
early grade to Senior Secondary levels, requires continuous practice, development and refinement
for which Library is required to be updated with addition of books, journals, magazines and other
reading material from time to time along with increased access to e-resources.
DRAFT DOCUMENT
79
Further, Library facilities are to be linked with the understanding of Early Grade Reading
and Writing and early grade pedagogy. It is to consider the books and other progressive reading
material taking into account the diversity of the learners, covered under the Integrated Scheme.
Facilities available in the Library will strengthen reading with comprehension, oral and written
language connection, use of literacy in everyday life and using children experience as resources in
literary learning.
There will be Reading Corners with Children’s Literature for which States and UTs will
ensure selection of appropriate literature for children and usage in facilitating the reading-writing
processes. Graded Reading Series (e.g. Barkha Series by NCERT) for self reading of children and
developing reading skills as whole and children’s magazines are to be made available in the library
for facilitating reading for joy and creativity.
The child-friendly components in the light of PBBB, such as Reading and Activity Corner,
Poem Corner, Message Boards, Folk Stories, etc are to be taken into account while including books
and other reading material for the library. Besides, books (textbooks as well as reference books and
supplementary reading material based on Learning Outcomes) on all subjects from early grade to
Senior Secondary are to be provided to children through library for meeting their reading curiosity
and improving their learning outcomes. Care must be taken in adding books and other material as
per the competencies of all classes covered under the integrated scheme. Tribal Primers, Tribal
Textbooks, supplementary material and dictionaries of tribal languages as per the local specific
requirements may be considered while adding reading material for the library.
5.5.1.6 Rashtriya Avishkar Abhiyan (RAA)

 With the focus on connecting school-based knowledge to life outside the school, making
learning of Science and Mathematics a joyful and meaningful activity and to bring focus on
innovation and use of technology, Rashtriya Avishkar Abhiyan (RAA) has been initiated as a
convergent framework that aims at nurturing a spirit of inquiry and creativity, love for Science and
Mathematics and effective use of technology amongst children of the age group of 6 to 18 years.
The execution of RAA will span across various interventions of the integrated scheme to encourage
learning of Science, Mathematics and Technology. The major objectives of the programme are:
• To enable children to become motivated and engaged in Science, Mathematics and
Technology (STEM) through observation, experimentation, drawing inferences,
model building, rational reasoning and testability.
• To create curiosity, excitement and exploration among school children in Science,
Mathematics and Technology.
• To create a culture of thinking, inventing and doing; to promote enquiry-based
learning in schools.
• To achieve learning levels appropriate to the class of study in Science and
Mathematics.
• To encourage and nurture schools to be incubators of Innovation.
 As per these objectives, States and UTs have to plan specific RAA initiatives for
innovation and excellence in Science, Mathematics and Technology including Community
DRAFT DOCUMENT
80
Sensitisation and engagement, Improving School Science Facilities, Teacher Support Systems,
Effective Classroom Transaction & Assessment and Nurturing Student Clubs and Competitions.
 Support for imitative under Rashtriya Avishkar Abhiyan will be provided as per the
State/UT specific proposals. The States and UTs may plan activities such as Science and
Mathematics Kits, strengthening Science and Mathematics Laboratories, Science Exhibitions and
Mathematics Melas, capacity building of Science and Mathematics teachers, exposure visits,
Science, Mathematics and Technology Clubs for Children, mentoring by Higher Education
Institutions, documentation and sharing of best practices, etc. Initiatives under ICT will also be
utilised for supporting objectives of RAA wherever required.
5.5.1.7 ICT and Digital Initiatives
 Today, technology has increasingly become a vital element in the enhancement of quality
in education. The use of ICT would help transform the process of teaching and learning from the
traditional instructional teacher-centred endeavour to a learner-centred approach. Therefore,
teachers need to equip and acquaint themselves to the use of technology for pedagogical practices
which would lead to improved efficiency. Training in ICT is provided through in-service training
programmes. Teaching-learning processes could be enhanced through computer aided learning
Some of the objectives of ICT in schools are:
• To provide a variety of educational experiences
• To implement the principle of life-long learning / education
• To promote equal opportunities to obtain education and information
• To promote self-paced learning
• To develop a system of collecting and disseminating educational information
• To develop distance education with national contents.
• To promote the culture of learning at school (development of learning skills,
expansion of optional education, open source of education, etc.)
• To support schools in sharing experience and information with others (Best
Practices)
• To foster Computer Aided Learning
• To facilitate tracking of teachers and student attendance through Biometric system.
 For teachers too ICT would help in effective delivery of content, evaluation, in providing
feedback, record keeping and also for self-appraisal, professional development etc.
5.5.1.8 School Leadership Development Programme
The role of Head of a School is vital for the quality of education imparted in the school.
Realizing the pivotal role of school heads, School Leadership Development Programme (SLDP) has
been initiated across all the levels of school education to build and enhance the capacity of school
heads on a long term and continuous basis. It helps in training the heads of schools to initiate
proactive practices for school transformation, rather than merely discharging administrative and
managerial responsibilities. The capacity building of school heads is not through conventional
DRAFT DOCUMENT
81
models of training that are one-time but through mechanisms of long-term developmental
trajectories which help school heads address real life challenges in schools. The National Centre for
School Leadership (NCSL) has established State Resource Group teams in respective States/UTs to
build leadership capacities of school heads. In order to reach out to each and every head of school
more efficiently the use of technology has been harnessed. Now this programme has been designed
and made available to all school heads through the Modular Object Oriented Dynamic Learning
Environment (MOODLE) platform in the form of Online Programme on School Leadership and
Management (PSLM). In the context of the SLDP, guidelines developed by NIEPA may be
followed for training of both Resource Persons and Head Masters/Principals up to the Senior
Secondary level.
5.5.1.9 Shaala Siddhi
The need for improving whole school performance and providing quality education for all
children is increasingly felt in our education system. One of the major quality initiatives in school
education sector is comprehensive school evaluation which focuses on school, its performance and
improvement. Towards this, National Programme on School Standards and Evaluation (NPSSE) has
been initiated by NIEPA, under Ministry of Human Resource Development. NPSSE visualizes
‘School Evaluation’ as the means and ‘School Improvement’ as the goal and is tailored to suit the
diversity of Indian schools.
NPSSE will enable the school to evaluate its performance against the well-defined criteria in
a focused and strategic manner. The School Standards and Evaluation Framework (SSEF)
comprises seven ‘Key Domains’ as the significant criteria for evaluating performance of schools.
As part of the SSEF, a ‘School Evaluation Dashboard has been developed to facilitate each school
to provide consolidated evaluation report, including areas prioritized for improvement. The School
Evaluation Dashboard is developed both in print and digitized format.
The School Evaluation Dashboard, obtained from each school, is consolidated at cluster, block,
district, state and national level for identifying school- specific needs and common areas of
intervention to improve school performance. A web-portal on School Standards and Evaluation has
been developed. The Key features of NPSSE are:
• A comprehensive instrument for school evaluation leading to school improvement.
• Enable schools to evaluate their performance in a more focused and strategic manner
• Facilitate to make professional judgments for improvement.
• Establish an agreed set of standards and benchmarks for each school,
• Focus on key performance domains and their core standards.
• Engage all schools in self-evaluation
Eventually, data pertaining to the self evaluation will be collected through ShaalaKosh.
Extended U-DISE (ShaalaKosh) is a unique initiative of MHRD which aims to create a single
platform to meet the data requirements of all stakeholders in school education ecosystem. The
platform will cater to entire value chain requirements of the three key stakeholders - student, teacher
and school management and enable data collection in a streamlined manner.
DRAFT DOCUMENT
82
5.5.1.10 Textbooks
Appropriate use of text books is a major indicator of quality education imparted in schools.
Therefore Textbook production reform, including the layout and design, text and cover paper size and
specifications, ink, printing and binding, etc., have significant implications. Textbooks are covered
under RTE entitlements. There is support for provisions for textbooks to all children in
Government/Local Body and Government Aided schools, including Madarsas desirous of introducing
the State curriculum, at primary level and at upper primary level. The textbooks should keep the
principle of equity and inclusion at the forefront, proactively break extant stereotypes and reflect
sensitivity to gender, caste and class parity, peace, health and needs of differently abled children.
National agencies like NCERT would play a major role in enhancing the capacity of State agencies to
undertake this task, and help sustain academic consultations for a critical review of curricular
initiatives.
While undertaking revision of textbooks it will be important to rationalise the number of books
both at the primary and upper primary levels such that there is no additional curriculum load on
children. There is also need to integrate the various learning materials like textbooks, workbooks,
worksheets, LEP materials etc. with the purpose of reducing an unnecessary additional burden on the
teacher and child, as well as bringing in cohesiveness and reducing overlaps. The textbooks should be
designed to nurture an aesthetic sensibility in children. There should be adequate focus on good quality
printing and visual design of books alongside improvement in content. Attention has to be paid for
preparation of handbooks for teachers on new textbooks and the new approach to curriculum. States
can support workbooks, worksheets and other essential teaching learning materials which together
constitute textual materials for the subject, class or grade.
It is important that states ensure timely supply of books before the start of the academic
session For the purpose, a real time monitoring tool should be instituted so that there is no delay in
supply of textbooks which can appraised based on the data provided by the State/UT for such
children under SDMIS.
Reuse of textbooks: Every child in the school must receive textbooks on time i.e. at the
beginning of the academic year. For every academic session, thousands of new textbooks are
printed, bought and used. On the other hand, almost the same number of textbooks and course
material are discarded after use. Usually these textbooks are not reused or recycled generating huge
quantities of paper waste. Reuse of textbooks will conserve resources, finances and will generate
less paper waste besides educating the children to reuse and recycle and taking care of the
environment. There is a greater need that text books are shared and re-utilized while establishing a
culture of environmental responsibility. Text book collections could be kept and maintained at
school level by the school authorities or by the parent teachers association or any NGO. In addition,
students need to be made responsible and aware towards protecting the environmental resources.
States need to encourage schools for creating book banks so that the initiative of reuse of textbooks
could be encouraged. Special incentives would be provided to the better performing States. The
money thus saved from the budget for procurement of new books may be utilized under flexi- fund
for other student oriented activities like purchase of tablets, smart boards, Printing better quality text
books, encyclopaedias, audio video aids, etc.
DRAFT DOCUMENT
83
Energised Text books: Supply of free textbooks at the elementary level is covered under
RTE entitlements. However, the new scheme also supports the process of revising the syllabus and
improving the quality and rigour of textbooks by introducing energised textbooks. Energised
Textbooks are text books which are equipped with QR codes and have e-learning content linked to
them. The digital content will be mapped to the respective learning outcomes and make the content
universally available to the students. Such digital content is intended to give greater scope to
enhance the learning levels of the children and ensure better learning. The process requires
professional resources to create high quality digital content that can be accessed by students and
teachers seamlessly and is also dynamic in nature.
5.5.1.11 Community Mobilization
 Community mobilisation and close involvement of community members in school
education is extremely critical as it fosters ‘bottom up approach’ not only in effective planning and
implementation of interventions in the schools but also in effective monitoring, evaluation and
ownership of the government programmes by the community. Active participation of the
community also ensures transparency, accountability and helps in leveraging the cumulative
knowledge of the community for better functioning of the school.
 In the context of community participation, it is important to underline the significance of
the teacher as a key partner in planning and implementing community participation strategies. In
fact participation for RTE implies a mutually supportive and collaborative partnership among
teachers, pupils, parents, community and civil society. It is an established fact that teachers
perform better and with enthusiasm if they get wholehearted parental and community support. The
integrated scheme assigns special importance to decentralised planning and implementation with
active involvement of community members, teachers, parents, local bodies including Panchayati
Raj Institutions, Municipal Bodies, and other stakeholders in the management of school education
through establishment of multi-member SMDCs. Every school may constitute a SMC/SMDC at the
school level which will include representatives of local authorities, academicians, subject experts,
officials, representatives of disadvantaged groups, women and parents/ guardians of student.
 The SMCs/SMDCs are expected to co- exist with and leverage on the Parents Teachers
Association. Meetings should be planned and conducted on a regular basis.
 Training of SMC/SMDC Members: Proper training and capacity building of
SMC/SMDC members about their roles and responsibilities is extremely critical towards ensuring
their active and effective participation in planning, monitoring and supervision of the school
activities. States/UTs should endeavour to adopt and adapt the training modules already developed
appropriately. In case of requirement, suitable Agency, and areas in which training module is to be
prepared should be identified and included in the Plan proposal with clear timelines. Themes of
modules may differ from State to State as per need identification done at the school level. To
ensure maximum participation of community members, the trainings should be conducted at the
village/school level.
DRAFT DOCUMENT
84
Akshay Petika
Akshay Petika is an innovative project started in Dholpur District of Rajasthan. It is a unique
way to mobilize funds for school expenses. A box named Akshay Petika is placed in the school
in which whoever wants to donate to school can put their contribution.
Students contribute on important days like Birthdays festivals and other important days.
Teachers too contribute on their Birthdays, Marriage Anniversary and other special occasion.
The box is opened in front of the members during the SMDC meetings. The money collected in
the box is transferred to school account and the same is used as per the needs of the school.
Seeing the success of the project, Rajasthan Government has circulated a memorandum to all
the schools to have Akshay Petika in their respective schools.
5.5.2 Other Quality Interventions
The vision of the Integrated Scheme is to make education of good quality accessible,
available and affordable to all. The scheme supports need-based funding and flexibility in
expenditure to States. The objective is to have sector-wide development programme/scheme to
harmonise the implementation mechanisms and transaction costs at all levels, particularly in using
state, district, sub-district level system and resources, besides envisaging a comprehensive strategic
plan for development of school education. Therefore, States & UTs will have the flexibility in
proposing their local, specific quality contexts along with well-defined parameters which would
lead to healthy teaching-learning processes and improved learning outcomes. Some of such
components are Learning Enhancement Programmes, Curriculum Reform, Guidance and
Counselling, Aptitude Tests, Exposure to Vocational Skills, Performance Indicators for teachers
(PINDICS), etc. Details of interventions are given below:
5.5.2.1 Learning Enhancement Programme (LEP)/Remedial Teaching
Each individual is unique in terms of cognitive and affective development, social maturity,
ability, motivation, aspiration, learning styles, needs, interests and potential. Innate variations in
intelligence, social and economic background, past learning experiences, and perhaps variations in
the level of congruence between the learner and the curriculum are also factors underlying student
differences. Catering to individual differences, therefore, assumes paramount importance. To
achieve this, students are provided with suitable assistance and guidance in accordance with their
abilities and learning needs, so that they can develop their potential to the maximum extent.
Approaches such as remedial teaching and bridge courses have been used at the elementary
level and more progressive approaches such as Learning Enhancement Programme are implemented
to address the challenges at secondary level, with the main objective of identifying the learning gaps
and equipping students with the core learning pre-requisites appropriate for the particular grade.
The support will be for developing teacher support material, supplementary reading
material, etc. for Classes I-XII taking into account the child centric assumptions in NCF- 2005 and
the RTE Act, 2009. Such learning support would help students who lag far behind their counterparts
in school performance.
DRAFT DOCUMENT
85
Schools need to be encouraged to conduct base line assessment to find out the strengths and
weaknesses of students before deciding on the appropriate curriculum, and learning and teaching
strategies. The assessment would also help to get a clear idea of the learning gaps and identification
of the learners who need extra learning support. It is imperative that the assessment tool meets the
criteria of validity, reliability and is suitable to adequately evaluate academic performance relevant
to the desired outcome and reflect what students have learned and what they can do. LEP should be
integrated with normal classroom processes. The strategy must include total number of children to
be covered, block wise and Class-wise Learning Outcomes to be achieved through the LEP. Also
details of learner-related, teacher-related and process-related interventions of LEP have to be
reflected and well defined in the plan.
Schools should ensure that they are equipped with sufficient material like work books,
worksheets, etc. for supporting quality of learning and providing remediation. There can be
flexibility in conducting LEP. The States/UTs may decide the schedule and the programme as per
the local and contextual needs. Involvement of key players like teachers, Resource Persons, CRCs,
BRCs, DIETs, SMC, community, etc. in the implementation of the programme is vital. Liaisoning
with parents would also help in understanding children better so as to provide appropriate guidance.
The progress record of each child is to be maintained. It should be a collective responsibility of the
Head Teacher, Subject Teachers, SMC members and parents for the smooth conduct of activities
under LEP and remedial classes. By timely checking the progress through continuous feedback, the
process of learning can be strengthened. The implementation needs to be followed up with
assessment to measure the impact of the programme.
5.5.2.2 Padhe Bharat Badhe Bharat (PBBB)
PBBB is a nationwide programme on early grade pedagogy. The two tracks of PBBB
are Early Reading and Writing with Comprehension (ERWC) and Early Mathematics (EM). The
focus of the programme is to create classroom and school environment conducive and vibrant to
early reading and writing experiences and early mathematics. Accordingly, support will be provided
to States and UTs for implementing activities under PBBB for early grades as well as extending the
same to other classes as per the requirements.
Proposals under PBBB may include components related to Early Reading and Writing with
Comprehension and Early Mathematics, such as:
• Curriculum design and material development
• Teacher training and capacity building
• Development of Bridge material
• Print-rich environment
• Enabling classroom transaction
• Connecting classroom with community
• Assessment of learning
• Reading corners
• Home to school language transition
• Understanding and improving CCE
DRAFT DOCUMENT
86
• Relating learning with ICT initiatives etc.
PBBB may be extended to other classes as per the needs and linkage of the programme with
Learning Outcomes.
5.5.2.3 Curriculum Reforms

 School curriculum and pedagogy must provide opportunities for every child’s learning and
his/her free, creative and multidimensional development. The culture and experiences each child
brings to the school must be integrated to an egalitarian teaching-learning process in fulfilment of the
goal of a meaningful education to all children. When children of different backgrounds study together,
it improves the overall quality of learning and enriches the school ethos. Social justice has many
implications. One obvious implication is that special efforts will be required to ensure that education
promotes an inclusive identity. Children belonging to religious and linguistic minorities need special
provisions and care in accordance with the perspective reflected in the Constitution. Flexibility and
plurality must be at the core of the vision of school education.
Presently, the serious challenge lies in the curriculum being too loaded with information. in
addition to cognitive and analytical skills, adequate attention on activities like life skills,
experiential learning, health and physical education, sports, visual and performing arts, literary and
creative skills, and work based education are indispensable. Though the existing curriculum does
incorporate these skills, however, the load of curriculum in cognitive and analytical area seems to
be so heavy that students practically do not get much time to develop skills in other areas.
Therefore there is an urgent need to rationalise the school curriculum so as to prepare a good
human being. Also there is a need to develop a system where students get time for each of these and
can progress in the areas which he or she likes most. Rationalisation of the syllabus may help
reduce the burden of curriculum and make the content more balanced in various subjects offered
from class I to class XII. It is the need of the hour to inculcate value education, life skills, vocational
skills, experiential learning and physical fitness in our daily life through systemic curricular
reforms. Unless we bring comprehensive and serious reform in curriculum incorporating the
concerns related to pedagogy of science, mathematics, language, ICT, health, arts, etc. generating
the need for the use and sharing of resources, the resource challenge will continue to be a constrain
for improving quality.
 Benchmarking (outcomes) is a way of thinking about national performance, about local and
regional effectiveness and performance at the level of individual schools. Benchmarks can be used
diagnostically and formatively to inform policy and practice. The challenge of comparability is to
create an open and positive climate for dialogue. The obvious place to start with learning outcomes
attained by children is at school, their acquisition of basic skills at key stages of development, etc.
There is a need to evolve a mechanism at state level to bring curriculum reform in tune with the
emerging curricular vision as suggested in NCFs and National Education Policies and also infusing
learning outcomes in the curriculum. Evolving a mechanism to provide all the children an opportunity
for meaningful learning and successful completion of school education by creating enabling school
DRAFT DOCUMENT
87
environment and inclusive curriculum requires to have continuous dialogue with teachers and state
functionaries.
 The curriculum reforms should also cater to the bridging needs of out of school children till
they are mainstreamed into regular schools.

At present, the system is concerned about reducing load of curriculum. In view of this,
States/UTs need to develop and design books such that they focus on the construction of knowledge by
learners through the understanding of concepts, by active exploration, reflective thinking, and by
providing interactive opportunities for children to conduct activities in groups, with continuous self
and peer assessment.
5.5.2.4 Multi-Lingual Education and Bridge Courses for Tribal Children
Providing multi-lingual education is not a simple task. Even mother tongue education is
challenged by a host of problems. Educational research has shown that the mother tongue is the best
medium of instruction, and inclusion of tribal children hinges crucially on the language issue. With
the RTE Act adding immediacy to their inclusion, this issue must be addressed fully, rather than
ignored due to the complexities involved. For this, support will be needed from all quarters
interested in and accountable to a pluralistic social order that will ensure enhanced participation of
the tribal people. For a start the Tribal Welfare and Education Departments, responsible for
implementation, will need to communicate with each other and interact with NGOs and scholars
who could support the processes. The states that have shown some initiative in this regard will also
need to be supported.
The following suggested list of interventions may be implemented for encouraging MultiLingual Education and Bridge Courses for tribal children.
• Teaching in the local language by native speakers
• .Development of educational material in local languages using resources available
within the community.
• Establishing resource centres in tribal dominated States for providing training, academic
and other technical support for development of pedagogic tools and education material
catering to multi-lingual situations.
• Training of teachers in multilingual education.
• Sensitisation of teachers to tribal cultures and practices.
• Incorporation of local knowledge in the curriculum and textbooks.
• Creating spaces for cultural mingling within schools so as to recognise tribal cultures
and practices and obliterate feelings of inferiority and alienation among tribal children.
• Involvement of community members in school activities to reduce social distance
between the school and the community.
• Textbooks in mother tongue for children at the beginning of Primary education where
they do not understand regional language.
• Special training for non-tribal teachers to work in tribal areas, including knowledge of
the tribal dialect.
DRAFT DOCUMENT
88
• Special plan for nomadic and migrant workers.
5.5.2.5 Guidance and Counselling
Guidance and counselling is an important aspect of school education that aims at providing
educational, personal and vocational guidance and counselling service to children. States and UTs
may consider framing a special strategy for guidance and counselling in schools. It would be
desirable to have teachers qualified on guidance and counselling services and thereby capable of
conducting varied guidance and counselling programmes in schools. Moreover, the existing
teachers should also be trained for this purpose, besides arranging Guest Lectures by prominent
people in different fields.
Standardized tests may be used for identifying the needs, interests, strengths and weakness
of the learners and accordingly provide the required guidance and counselling services. Linkage of
guidance services with vocational education, etc. as per requirements may be considered.
5.5.2.6 Aptitude Tests
As per the NPE, it is necessary to have effective career guidance and counselling at the level
of secondary school education. In alignment with the policy guidelines, NCERT has developed
aptitude tests for class IX students to assess their interests so that they can choose and pursue the
right course. The idea is to introduce a system for scientific assessment of students’ inherent skills
and potentials so that they have a clear understanding of their merits, demerits and capabilities. This
will not only help students plan their career at an early age, but also come as a guide to their parents
when they plan their career. The results of the aptitude test would help parents plan a “realistic”
career path for their children, instead of forcing them to choose a career of their choice. The
aptitude of the children will be identified through psychometric tests comprising questions on
numerical reasoning, verbal reasoning and diagrammatic reasoning.
5.5.2.7 Continuous and Comprehensive Evaluation (CCE)
CCE should be used as a strategy for assessment and bring improvements in child’s
learning. By continuous evaluation, teacher’s work can be continuously guided by the child
response and participation in classroom activities. Comprehensive evaluation would help to view
the child from a holistic perspective rather than merely in terms of a learner of different subjects.
CCE focuses on formative assessment comprising of the student's work at class and home, the
student's performance in oral tests and quizzes and the quality of the projects or assignments
submitted by the child. Besides CCE, Summative Assessment can be in the form of tests or
examinations.
5.5.2.8 Exposure to Vocational Skills
The education sector is growing at fast speed and its dimensions and coverage are increasing
day by day. In order to keep our students update about the changes occurring in the global
perspectives, it is very essential to plan for their exposure visits to industrial establishments, service
DRAFT DOCUMENT
89
industries, progressive farms etc. Such exposure would acquaint the students with various
vocations. This will also reduce the boundaries between the bookish knowledge and application of
knowledge and expose children to the skill requirements in the work areas. Further exposure to
vocational skills may be introduced as part of the curriculum for children of upper primary classes,
as they can make informed choices while selecting vocational subjects at the secondary level.
Vocational education may be added as one of the measures to reduce dropout and improve
retention.
5.5.2.9 Kala Utsav
Kala Utsav is an initiative of MHRD to promote Arts (Music, Theatre, Dance, Visual Arts
and Crafts) in education by nurturing and showcasing the artistic talent of school students at
secondary stage in the country, and it is also a platform to bring arts to the centre stage in an
inclusive environment. As part of Kala Utsav, competitions in various Art forms at various levels
are held.
5.5.2.10 Excursion
To provide scope to the students to gather experiences by visiting the historical sites,
monuments, areas etc. where they will learn through practical way and interact and share with
fellow students, excursion trips are arranged. Also visit to higher education institutions are arranged
which provides wide exposure and motivation to students and help them gain in depth
understanding of matters related to career and higher education.
5.5.2.11 Performance Indicators for Teachers (PINDICS)
Performance Indicators for teachers (PINDICS) is to be used by teachers themselves for
assessing their own performance and to make continuous efforts to reach the expected level. It can
also be used for teacher appraisal by the supervisory staff/mentor to assess performance and to
provide constructive feedback for further improvement. PINDICS includes the performance
standards, such as, Designing Learning Experiences for Children, Knowledge and Understanding of
Subject-matter, Strategies for Facilitating Learning, Interpersonal Relationship, Professional
Development, School Development, Teacher Attendance, etc.
PINDICS has also been made online. Mobile App is also available for the same. States and
UTs may encourage all teachers to assess their performance. This will lead to need assessment for
training of teachers.
5.5.2.12 Sports and Yoga
Realizing the need for holistic development of children, Yoga and physical activities are
encouraged. Physical education instructors are recruited in schools. Under this, Yoga Olympiad
may be conducted at school district, state and National levels. Also, regular support is provided for
provision of sports equipment in schools.
DRAFT DOCUMENT
90
5.5.2.13 Laboratories
To provide hands on experience for students, the Scheme has the provision of setting up
laboratories in various disciplines like Science, Mathematics, Language, Social Science and
Computers in schools at different levels.
Tinkering Lab: The objective of setting up of this Lab is to foster curiosity, creativity and
imagination in young minds and inculcate skills such as design mind-set, computational thinking,
adaptive learning, physical computing, rapid calculations, measurements etc. Young children will
get a chance to work with tools and equipment to understand what, how and why aspects of STEM
(Science, Technology, Engineering and Math). An integrated approach to Science and Math shall
inculcate real understanding and bring out innovation. Detailed Strategy for implementation of the
Project is to be made as per established norms.
5.5.2.14 Twinning of Schools
Twinning of schools is known as ‘Partnership among schools’ under which well-functioning
Private or Government Schools in urban or semi-urban areas may be linked with schools located in
rural areas for interaction and exchange of experience. Under the exchange programme, the students
from rural schools may be brought to schools in urban areas for one week and vice-versa for greater
exposure.
The rationale behind this innovative programme is that it offers a powerful alternative to
four walled classroom chalk and talk method. It aims to explore new dimensions of learning which
will provide and enable the students to understand and respect cultural differences and help in
creating committed, disciplined and productive individuals. The major objectives of the programme
are:
• To bring all students on one common platform;
• Enable the partner schools to adopt best practices from each other;
• Share experiences and learn jointly
• Develop the spirit of Comradeship
• Get an exposure to the strength and weakness of self and others;
• Provide opportunities to the teaching fraternity to adopt better and more effective
practices;
• Develop a sense of interdependence and understanding towards each other;
• Recognize the gaps and make efforts to bridge them;
• Instil a spirit of sharing, caring and togetherness, etc.
Various types of schools, viz, rural-urban schools, government-private schools, elementarysecondary schools, residential- non-residential schools may be covered under this programme
taking into account the aforesaid objectives.
DRAFT DOCUMENT
91
5.5.2.15 Student Exchange Programme
One-to-One linkage for Students/ Student Exchange Programme is to connect one school to
a sister school in another part in the country. The chief objective is to provide an opportunity to the
children to visit other states and interact with their counter parts which in turn will promote
exchange of ideas, cultural integration and avenues for career paths for students. This will enable
them to enrich their knowledge about our country. It would also help showcase their talents and
learn from one other.
5.5.2.16 Research

 Research plays an important role in assessing and monitoring the progress in education.
Research and evaluation studies are undertaken at national, state, district level and may also be
conducted at the block, cluster and school level in the form of Action Research for providing greater
insight into issues and problems faced in implementation of the various components of the scheme at
different levels. The findings of research studies would help in more systematic planning of the inputs
and strategies for further improvement. Apart from evaluation of the inputs and how the programme is
being implemented, research would also include evaluation of outcomes and impact of interventions
provided for specific purposes under the integrated scheme. States should give priority to developing
and implementing, research projects concerned with quality related issues, such as estimating out-ofschool children; status and effectiveness of Special training centres; Completion rate/Dropout rate and
Transition Rate; assessing state’s curriculum in the light of NCF; students’ learning outcomes;
student’s and teachers’ attendance rates: effectiveness of teacher training: efficacy of textbooks and
other Teaching-Learning Material (TLM), quality of academic supervision and guidance provided by
BRCs/CRCs/DIETs; discriminatory practices in schools, teaching-learning in classrooms;
implementation of CCE in schools; role of SMCs in school management, etc. The priority areas of
research at the state level and district level should be decided by the Resource Groups or Research
Advisory Committees at those levels.
5.6 Innovation
Innovation is central to improve the quality of education. The present scheme seeks to capture
innovations in education sector from each State /UT which significantly contribute to the improvement
of learning outcomes or overall condition and quality of education. The overarching objective is to
give schools a new or creative alternative to the existing instructional and administrative practices,
that is intended to improve academic performance and learning for all students and to promote, nurture
and advance the culture of design and innovation in the country leading to significant contributions
and breakthroughs impacting quality of human life. This can be realized only by fostering conducive
conditions for innovation in the educational system.
In the light of the above, State/UTs may initiate Innovation projects to bring qualitative
improvement in school education. It can also be technological, non-technological, organizational or
those based on societal contexts including modern as well as conventional practices in a new
geographical or environmental context. Some broad areas like access, equity, quality, learner centred
pedagogy, learning enhancement, creative use of technology for learner autonomy, Integrated learning,
DRAFT DOCUMENT
92
Co scholastic Activities, Life skills, Values Attitudes, Work Education, Health, Hygiene, Inclusive
practices, etc may be considered. Activities like Ek Bharat Shrestha Bharat (EBSB), Talent Search,
Transport and Escort Facility etc. are some of the projects under this intervention.
The innovations will be
• Targeted to improve learning outcomes with visible impact on the quality;
• Relevant to the need of the community and national development
• Projects that can be scaled up with potential for diffusion on a large scale
• Replicable and sustainable over the longer term
• Cost effective
There will be flexible funds for innovation for State/UT specific proposals for improvement of
access, equity, quality and governance of education. An example of innovation project is Transport
and Escort facility to children in Classes IX-XII for which details are given under:
Transport and Escort facility to children in Classes IX-XII
In view of academic flexibility for establishing a new secondary school, providing for
transport in form of bus passes, cycles etc can prove to be a better option. Many of the
States/UTs have implemented this option as an incentive to increase enrolment especially
for girls. Hence, at secondary level, this provision will be available only for girls enrolled
in classes IX-XII as an exceptional measure, subject to the proposal of State/ UT, justifying
the need for transportation/escort facility.
In addition to this, state government may also look into options for providing transport
facility, in place of construction of schools, Some of these options could be as follows:
• Student travelling a distance of more than 5 km to reach the secondary schools and
7 km to reach Senior Secondary schools may be provided with free bus passes.
Convergence with state transportation department needs to be explored in this
regard.
• Transport arrangements for students can be outsourced. Auto Rikshaw/ sumo/
boats may be outsourced to provide services for particular schools where the
sufficient students are available for travelling.
• A child admitted in IX class in rural areas may be given a bicycle/wheelchair
(for disabled student)/ ladies bicycle (for Girls). He/ She will use it while studying in
in subsequent classes also.
5.7 Support to Pre-School Level
 Support to States/UTs will be provided for co-locating Aganwadis in primary schools,
training of anganwadi workers for pre primary education in line with NCERT framework, and
curriculum development in convergence with the MoWCD. Details are available in the chapter on
Pre-school Education.
DRAFT DOCUMENT
93
5.8 Teacher Recruitment, Placement, Promotion and Transfer
5.8.1 Teacher Recruitment

 Quality education demands quality teachers. Quality teachers are those who are qualified as
per norms and device appropriate pedagogical practices as per the requirements of the learners,
learning processes and learning situations. The scheme visualizes teacher as an innovator as well as
a capable facilitator, who motivates children at different levels to construct their own knowledge.
The teacher should be well aware of progressive pedagogy and know the nature and experience of
children from various social and cultural backgrounds. Moreover, RTE Act, 2009 requires that
teachers should be committed to equity and social justice, aware of child entitlements and
convinced that all children can learn well if provided education of equitable quality.
As per the Section 24 (1) of RTE Act, a teacher appointed under sub-section (1) of section
23 shall perform the following duties namely:
a. maintain regularity and punctuality in attending school;
b. conduct and complete the curriculum in accordance with the provisions of sub-section (2)
of section 29;
c. complete entire curriculum within the specified time;
d. assess the learning ability of each child and accordingly supplement additional
instructions, if any, as required;
e. hold regular meeting with parents and guardians and apprise them about the regularity in
attendance, ability to learn, progress made in learning and any other relevant information
about the child; and
f. perform such other duties as may be prescribed.
 Thus, the RTE Act, 2009 recognizes the importance of providing adequate number of
teachers and lays down that the prescribed PTR is to be maintained for each school. It also
recognizes the need for subject specific teachers, head teachers and part time instructors for art,
health and work education in upper primary schools. In addition, it stipulates that no school shall
have a teacher vacancy of more than 10 per cent.
 The recruitment and other service matters of teachers are under the domain of State/UT
Governments and the Central Government is only to provide financial support as per the Scheme
norms. However, such support would be based on certain desirable guiding principles and required
to be followed by the State/UTs. Teachers for classes covered under the integrated scheme will be
recruited as per the norms prescribed by NCTE/appropriate authority and the terms and conditions
of the respective States and UTs. While recruiting teachers and Head Teachers/Principals, States
and UTs should fill the vacancies preferably on an annual basis. Provisions have to be made for
subject specific teacher recruitment for Upper Primary, Secondary and Senior Secondary classes.
Salary structure will be determined by the State/UT norms. There will be no separate teachers as
sanctioned by the Centre. Rather, all teachers are ultimately the responsibility of the State/UT
Government. State/UT may prioritize recruitment of Headmasters/Principals in government
DRAFT DOCUMENT
94
secondary/Senior Secondary schools as a separate cadre with provision of 50% direct recruitment
including limited direct recruitment based on merit.
5.8.2 Teacher Deployment and Re-deployment

Deployment and re-deployment of teachers is required to ensure that schools at all levels
comply with the PTR norms. States and UTs have to device immediate interventions for redeployment of surplus teachers to schools where the PTRs exceed the RTE stipulations or
prescribed norms. It is suggested that States/UTs undertake a rational re-deployment of teachers to
ensure that the RTE stipulations are adhered to and all classes from class I to XII meet PTR norms.
There is clearly a need to evolve a more online transparent system of transfers and redeployment of teachers-a system which is both child-centred and teacher friendly. The
implementation of the online system for fresh postings, transfers and re-deployment would help the
States/UTs in maintaining school-wise PTR as stipulated under RTE / provisions mandated in a
transparent manner. A systematic online data base is required to:
• Generate a list of under-served and over-served schools.
• Create a vacancy database.
• Generate a list of vacancies subject-wise and school wise.
• Be sensitive to the needs of physically handicapped teachers, women teachers and other
categories as prioritized by the State/UT.
• Correct existing imbalances in teacher deployment.
• Be customized to State/UT needs etc.
 States/UTs may also evolve a sub policy for deployment of teachers and school heads where
teacher transfer is governed by legislation. Suitable guidelines may be developed to ensure that
school teachers spend adequate time serving in rural areas for which a policy of transfer of teachers
to rural areas after serving continuously for a given number of years in urban areas, may be put in
place.
5.8.3 Teacher Qualifications

 It is important that qualified teachers are recruited by advertising the posts and filling them
on regular basis. According to the RTE Act, 2009, Section 23
1. Any person possessing such minimum qualifications, as laid down by an academic
authority, authorized by the Central Government, by notification, shall be eligible for
appointment as a teacher.
2. Where a State does not have adequate institutions offering courses or training in teacher
education, or teacher possessing minimum qualifications as laid down under sub-section
(1) are not available in sufficient numbers, the Central Government may, if it deems
necessary, by notification, relax the minimum qualifications required for appointment as
a teacher, for such period, not exceeding five years, as may be specified in that
notification:
 Provided that a teacher who, at the commencement of this Act, does not possess minimum
qualifications as laid down under sub-section (1), shall acquire such minimum
DRAFT DOCUMENT
95
qualifications within a period of five years. Amendment of Section 23, sub-section (2)
makes the proviso, “provided further that every teacher appointed or in position as on
the 31st March, 2015, who does not possess minimum qualifications as laid down under
sub-section (1) shall acquire such minimum qualifications within a period of four years
from the date of commencement of the Right of Children to Free and Compulsory
Education (Amendment) Act, 2017.”
3. The salary and allowances payable to, and the terms and conditions of service of,
teachers shall be such as may be prescribed.
Thus, States and UTs should follow the qualifications as prescribed by NCTE for recruiting
teachers and Head Masters/Principals for classes up to Senior Secondary with emphasis of Teacher
Eligibility Test (TET) for recruitment (as applicable) and updating of teachers’ profile in
UDISE/ShaalaKosh and DIKSHA related to it.
5.9 Conclusion
Enhancing quality of school education requires systemic reform for translating the vision of
quality in this Scheme into the lived experience of all children in the schools. However, making
significant improvements to system-wide educational outcomes is a complex task that requires a
multi-faceted approach. No single element may be sufficient for progress, but most are necessary.
At the core are policies and guidelines that focus on improving teaching and learning, including
curriculum, teaching skills, leadership and assessment. However, at the time of implementation,
plans by the States/UTs must take into account the context and possibilities for implementation by
referring the guidelines on quality parameters. These may be followed up with appropriate
executive instructions and training to all stakeholders.

DRAFT DOCUMENT
96
CHAPTER 6 – TEACHER EDUCATION AND TEACHER TRAINING
Historical Perspective
The earliest policy formulations emphasized the need for teacher education to be “brought into the
mainstream of the academic life of the Universities on the one hand and of school life and
educational developments on the other” (Kothari Commission, 1964-66). It is indeed a matter of
concern that teacher education institutes continue to exist as insular organizations even within the
University system where many are located. Recognising ‘quality’ as the essence of a programme of
teacher education, the Commission recommended the introduction of “integrated courses of
general and professional education in Universities…with greater scope for self-study and
discussion and a comprehensive programme of internship.”
Subsequently, while observing that “…what obtains in the majority of our Teaching Colleges and
Training Institutes is woefully inadequate…” the Chattopadhyaya Committee Report (1983-85),
reiterated the need “…to enable general and professional education to be pursued concurrently…”
and emphasized that “…an integrated four year programme should be developed carefully…(while
also making it) possible for some of the existing colleges of Science and Arts to introduce an
Education Department along with their other programmes allowing for a section of their students
to opt for teacher education.”
NPE, 1986 recognized the need for enhancing the status of teachers. It emphasized the need for
substantial improvement in their working conditions and the quality of teacher education. The
Policy called for overhauling the teacher education system and as a first step recommended the
following:
• Teacher education is a continuum and its pre-service and in-service components are
inseparable.
• DIETs be established with the capability to organize pre-service and in-service courses for
elementary school teachers and the personnel working in non-formal adult education sectors.
• At the national level, the National council of Teacher Education (NCTE) be established
which will have the power to accredit institution of teacher education, phase out the substandard institutions, provide guidance regarding curricula and methods.
• Networking arrangements are created between institutions of teacher education and
university department of education.
Background
The Centrally Sponsored Scheme of Restructuring and Reorganization of Teacher Education was
initiated in 1987 pursuant to the formulation of the NPE, 1986. It emphasized the significance and
need for a decentralised system for the professional preparation of teachers and it was in this
context that the DIETs, CTEs, and IASEs were established.
The Scheme was revised for the XII Plan in order to meet the exceptional challenges for the
Teacher Education System arising from the massive spatial and numerical expansion of schooling
facilities at the elementary and secondary level and corresponding increase in the demand for
DRAFT DOCUMENT
97
teachers. Modification of the Scheme was also critical in the context of the policy decision for
universalisation of secondary education. The revised Scheme was formulated in pursuance of the
RTE Rules (2010) under Section 38 of the RTE Act, notified on 8th April 2010. Subsequently, the
revised Guideline for Restructuring and Reorganizing of the CSSTE was developed and issued in
June 2012.
The Scheme was again evaluated with the completion of the 12th Five Year Plan in 2017 by Tata
Institute of Social Sciences (TISS). The evaluation study was carried out covering each of the five
zones in the country i.e., 90 institutions across 11 states (Assam, Bihar, Chhattisgarh, Himachal
Pradesh, Karnataka, Maharashtra, Mizoram, Madhya Pradesh, Rajasthan, Telangana and Uttar
Pradesh) and 2 union territories (Delhi & Puducherry). Also analysed during the course of the study
were documentary evidence of fund flow, vacancies, TEAB minutes, JRM reports of states, syllabi,
textbooks and curricular materials gathered from the sampled institutions.
The Integrated Scheme for School Education treats education holistically without segmenting from
Pre-school to Senior Secondary Level. However, since the concerns for quality and pedagogical
perspectives of different stages of School Education are different, the scheme takes into account
those concerns and provisions have been made accordingly. Thus, the integrated scheme also
focuses on strengthening and expanding the role of SCERTs and DIETs to cater to the diverse needs
of the teachers at different levels.
6.1 State Councils for Educational Research and Training (SCERTs)
6.1.1 Introduction
State Institutes of Education (SIEs) were established in mid-60s for qualitative improvement
of elementary education. Subsequently, in course of time, State Institutes/agencies were also set up
in some States to provide academic support to school education in areas of growing importance like
science education, educational technology, English language teaching, etc. and specific areas of
concern like examination reform, evaluation, educational and vocational guidance, etc.
At present, there are 30 SCERTs in the country. In addition, there are 3 SIEs located in
Jammu & Kashmir (Jammu & Srinagar) and A&N Islands (Port Blair). The Union Territories of
Puducherry, Daman & Diu, Dadra & Nagar Haveli and Lakshadweep do not have either an SCERT
or SIE. The functions related to quality improvement of school education in these union territories
are performed by State Departments of Education.
6.1.2 Institutional Vision
The SCERTs were originally visualized to become centres of excellence in the field of
elementary education. Their functions envisaged organisation of in-service training programmes
for teachers and supervisory personnel, conduct of conferences and seminars for senior officers
(district level and above) of Education Department. Over the years, the role of SCERTs as a state
resource institution, has expanded to provide academic support at all stages of education, undertake
co-ordination of all academic matters relating to school education, maintain appropriate linkages
with other educational organizations and provide supervision/support to the district and sub-district
level institutions. Other major functions of the SCERTs include development of curriculum,
DRAFT DOCUMENT
98
instructional material, textbooks, conduct research programmes, provide guidance and support to
state department of education and provide supplementary materials to address to the need of all
children including Children with Special Needs and teachers. Further, SCERTs are also expected to
perform a variety of roles for the national level institutions such as NCERT, NIEPA and NCTE, in
the conduct of state level studies and surveys, as well as take the lead in some major national
Initiatives such as Digital India, Skill India and Swachh Bharat, in collaboration with other state
level institutions working in the area.
6.1.3 Role & Function of SCERT
The vision of SCERT demands that its role be viewed at multiple levels. Major roles and
core functions of the SCERT can be classified under the following broad heads:
1) Academic Authority u/s 29 of the RTE Act: Under section 29(1) of the RTE Act, the State
Government has to appoint an academic authority to lay down the curriculum and evaluation
procedure which would be followed by all schools in the elementary level. Given their
existing mandate, most of the States have notified the SCERTs as the academic authority to
perform this function. This involves not only laying down the curriculum and evaluation
procedure but also to develop a system for assessment and evaluation of the learning
achievements on a continuous basis.
2) Policy matters: The SCERTs are expected to undertake policy research and to advise state
governments on policy formulation relating to school education and elementary teacher
education. This inter alia involves preparation of State Curricular Framework for School
Education, preparation of curriculum for the elementary teacher education course,
preparation of state perspective plan for teacher education, etc. SCERTs are also expected to
collate and disseminate available researches from universities, research agencies and NGOs
in order to make use of these researches for improving quality of the education.
3) Curriculum and Material Development: Preparing textbooks for all the stages of school
education across subject areas is one of the core activities of the SCERTs. The scope of its
functioning encompasses curriculum development, preparation of prototype teaching
learning material and text books for all levels of school education and teacher education.
The SCERT needs to be the focus of curriculum and pedagogical transformation for teachers
in all aspects. This includes not just cognitive and procedural aspects but their attitude to
children and education as well as their self-confidence, ownership and feeling of
responsibility.
4) Training and related activities: Organizing in-service teacher education annually for all
teacher educators, administrators, secondary level teachers and ECCE practitioners are
important functions of the SCERTs. Along with its in-service responsibilities, the SCERT
should attempt at evolving meaningful, short term and long term teacher education programs
on specific themes of specialization for secondary and senior secondary teachers,
administrators and teacher educators. Designing and implementing such programs would
also help them in visualizing the relevant inputs for in-service teacher education. As nodal
agency for teachers training, SCERTs will prepare an Annual Training Calendar in synergy
with DIETs, BITEs, BRCs and CRCs.
DRAFT DOCUMENT
99
5) Community and Children’s outreach: Community and Children’s outreach program and
network keeps the SCERTs rooted to the experience and issues at the ground level. The
Talimi Mela of Jamia Millia Islamia and the recent initiative of NCERT, to start a children’s
corner are some good examples of such initiatives. SCERTs (and DIETs) may need to have
a more frequent system for interacting with children.
6) Inter- disciplinary Coordination: The SCERT should be the nodal agency in the state and
establish proper coordination and collaboration with various statutory bodies like Board of
Textbooks, Board of Secondary Education and Department of Education. The SCERT as the
academic authority has the responsibility of developing learning outcomes, appropriate
teaching-learning materials, and modules for teacher preparation, etc. These components
are presently addressed in a piece-meal manner with different groups working, separately.
There is a need for a comprehensive understanding in each discipline. These groups should
be constituted by involving faculty from SCERT, CTEs, IASEs and DIETs. It is not possible
to have separate groups in all these subjects but each SCERT must have at least a few
groups working and developing new understanding.
7) Annual and Perspective Plan: The SCERT is expected to prepare a 5-year perspective plan
as well as annual work plans including physical and financial estimates of the proposals.
States which have a SIE would also be eligible for this provision. However, they would need
to upgrade the SIE into a full-fledged SCERT as per the MHRD guidelines on strengthening
of SCERTs (2018).
6.1.4 Strengthening& Restructuring of SCERTs
Given the expansion of school education in last decade after the implementation of the RTE
Act 2009 and the increasing demands for inclusive education in all the schools, appraisal of
SCERTs was important to strengthen SCERTs through analysis of its strengths and weaknesses to
address the gaps within the institution and its linkages with other institutions. Keeping this in view,
MHRD has developed guidelines for the strengthening of SCERTs in wider consultations with the
states/UTs. The guidelines prepared after wider consultation with the states/UTs, are as follows:
1) Restructuring: In view of the emergence of SCERT as a crucial Resource Organisation for
the entire School and Teacher Education, its restructuring is to be taken up on a priority basis.
SCERT needs to make a proposal for its own restructuring consulting different stakeholders and
present before state Government. Under this restructuring, there is also a need to create teacher
education cadre, if it is not in place. This is in view of the aspirational mandate of the restructured
SCERTs. There are large variations in states today in the number of sanctioned positions, number
and nature of departments, as well as nomenclatures and pay grades across various states. The
mandate of SCERTs/SIEs also differs across states and UTs – some SCERTs are responsible for
school education covering class 1 to 12, while other states cover only up to class 8 or class 10.
Keeping these variations in mind as well as the expanded mandate of SCERTs covering preschool to senior secondary levels, most SCERTs across India need to be strengthened to cater to the
needs of inclusive school curriculum, assessment, teacher education curriculum as well as research.
Given the wider role of SCERTs, models for restructuring are proposed including relevant and
adequate divisions, departments and faculty positions. However, due to variation in the size of the
population in different states and their requirement accordingly, two models for restructuring have
DRAFT DOCUMENT
100
been suggested for the States and UTs. Model-I is for those States which have population above 1
Crore and Model-II is for those States and UTs which have population of 1 Crore or below, as per
Census 2011. These two models vary in terms of number of faculty members proposed for different
Divisions and physical infrastructure. Both the models include organisation structure with five
major divisions including departments within the division and faculty positions are proposed. Broad
functions of each of these divisions are detailed in the tables below
Table-1 (a): The Proposed Organisational Structure Model-1 (Population above One Crore
as per Census 2011)
Name of
Division/Department Faculty Designation
Total
Faculty
Number
Details of Faculty
(Pre-school and
Primary)
Details of Faculty
(Upper Primary,
Secondary and Sr.
Secondary)
Director, SCERT 1 Professor 1
Jt. Director 1 Joint Director
(Academic) - Professor 1
Division of Curriculum
Research and
Development
1 HoD (Professor) 1
Maths and Science 3 Associate Professors
4 Assistant Professors 7
2 Faculty
(1 for Environmental
Studies 1 for Maths)
5 Faculty
(3 for Physics,
Chemistry, Biology
1 for Maths)
Social Sciences 1 Associate Professor
3 Assistant Professors 4
4 Faculty
(1 each for History, Political Science, Geography,
Economics)
Dept. of Language 2 Associate Professors
4 Assistant Professors 6 2 Faculty (1 for Hindi
1 for English)
4 Faculty
(1 each for Hindi,
English, 2 for
Regional languages)
Dept. of Commerce
Studies 1 Assistant Professor 1
1 Faculty
(1 for Accountancy
and Business Studies)
Dept. of Art Education 1 Associate Professor
1 Assistant Professors 2 2 Faculty (1 for Visual Arts & 1 for Performing
Arts)
Dept. of Work
Experience and
Vocational Education
1 Associate Professor
1 Assistant Professor 2 2 Faculty (For priority trades based on state
context and also for Work Experience)
Dept. of Health and
Physical Education
1 Associate Professor 1 1 Faculty (1 for Health and Physical
Education/Population Education)
Dept. of Inclusive and
Special Education
1 Associate Professor
1 Assistant Professor 2
1 Faculty (Each with specialisation in curriculum
development and inclusive pedagogy for children
with learning and physical disabilities
1 Faculty (Specialisation in addressing
intersectional issues across caste/gender/religious
inequities)
Dept. of Pre-school 2 Assistant Professors 2 2 Faculty (Each specialising in ECCE/ Preschool curriculum and pedagogy )
Division of Educational
Research, Survey &
Assessment
1 HoD (Professor)
1 Associate Professor
1 Assistant Professor
3
2 Faculty (1 specialising in quantitative research
and learning assessments & 1 specialising in
qualitative research)
Division of Teacher
Education
1 HoD (Professor)
2 Associate Professors 5 4 Faculty (3 for Pre-service education -
Philosophy, Sociology, Psychology & 1 for In-
DRAFT DOCUMENT
101
Name of
Division/Department Faculty Designation
Total
Faculty
Number
Details of Faculty
(Pre-school and
Primary)
Details of Faculty
(Upper Primary,
Secondary and Sr.
Secondary)
2 Assistant Professors service education)
Department of
Leadership and
Management
1 Associate Professor
1 Assistant Professor 2
2 Faculty (Each with specialisation in school
leadership, management and community
engagement/School Management Committees)
Division of ICT 1 HoD (Professor)
1 Associate Professor
1 Assistant Professors
3
2 Faculty (1 for CAL/ICT for student learning -
integration of ICT in Teaching learning & 1 for
ICT Initiatives (NTP, Prashikshak)
Division of Programme
and Monitoring
1 HoD (Professor)
1 Associate Professor 2 1 Faculty (Secialised in educational planning)
Academic posts 45
Library and
Documentation Cell
1 Librarian
1 Assistant Librarian
1 Professional
Assistants
3
1 Librarian
1 Assistant Librarian
1 Professional Assistants
Administrative
Division 7 7
3 Administrative Officers
1 Deputy Comptroller of Accounts (DCA)
1 Publications Officer
2 Editor/Assistant Editor
Technical Staff 5 5
2 - Professional Assistant for Library and
Documentation Division
3 - Technical staff for different departments
(computer assistant, semi-professional assistant,
laboratory assistant)
Project Staff 6 6 Project Fellows and/or Consultants on contractual
basis
*States and UTs have the flexibility to adopt the academic posts suggested as per need, with prior
approval of MHRD.
• Total 21 States/UTs have population above 1 crore as per the Census 2011. These are Uttar Pradesh,
Maharashtra, Bihar, West Bengal, Madhya Pradesh, Tamil Nadu, Rajasthan, Karnataka, Gujarat,
Odisha, Kerala, Jharkhand, Andhra Pradesh, Telangana, Assam, Punjab, Chhattisgarh, Haryana, Delhi,
Jammu & Kashmir and Uttarakhand.
• Qualification of all the academic posts needs to be in consonance with NCTE norms.
Table-1 (b): The Proposed Organisational Structure Model-II (Population One Crore or below
as per Census 2011)
Name of
Division/Department
Faculty Designation Total
Faculty
Number
Details of Faculty
(Pre-school and
Primary)
Details of Faculty
(Upper Primary,
Secondary and Sr.
Secondary)
Director, SCERT 1 Professor 1
Jt. Director 1 Joint Director
(Academic) - Professor 1
Division of Curriculum
Research and
Development
1 HoD (Professor) 1
Maths and Science 2 Associate Professors
3 Assistant Professors 5
2 Faculty
(1 for Environmental
Studies 1 for Maths)
3 Faculty
(Physics/Chemistry/Bio
logy and Maths)
DRAFT DOCUMENT
102
Name of
Division/Department
Faculty Designation Total
Faculty
Number
Details of Faculty
(Pre-school and
Primary)
Details of Faculty
(Upper Primary,
Secondary and Sr.
Secondary)
Social Sciences 1 Associate Professor
1 Assistant Professors 2
2 Faculty
(History/Political Science, Geography,
Economics)
Dept. of Language 2 Associate Professors
3 Assistant Professors 5 2 Faculty (1 for Hindi
1 for English)
3 Faculty
(1 each for Hindi,
English, 1 for Regional
languages)
Dept. of Commerce
Studies 1 Assistant Professor 1
1 Faculty
(1 for Accountancy and
Business Studies)
Dept. of Art Education 1 Associate Professor 1 1 Faculty (Visual Arts & Performing Arts)
Dept. of Work
Experience and
Vocational Education
1 Associate Professor 1 1 Faculty (For priority trades based on state
context and also for Work Experience)
Dept. of Health and
Physical Education
1 Associate Professor 1 1 Faculty (1 for Health and Physical Education)/
Population Education
Dept. of Inclusive and
Special Education 1 Associate Professor 1
1 Faculty (Each with specialisation in
curriculum development and inclusive pedagogy
for children with learning and physical
disabilities &Specialisation in addressing
intersectional issues across caste/gender/religious
inequities)
Dept. of Pre-school 1 Assistant Professors 1 1 Faculty (Specialising in ECCE/ Pre-school
curriculum and pedagogy )
Division of Educational
Research, Survey &
Assessment
1 Professor (HoD)
1 Associate Professor 2
2 Faculty (1 specialising in quantitative research
and learning assessments & 1 specialising in
qualitative research)
Division of Teacher
Education
1 Professor (HoD)
2 Associate Professors
1 Assistant Professors
4 4 Faculty (Pre-service education - Philosophy,
Sociology, Psychology & In-service education)
Department of
Leadership and
Management
1 Associate Professor 1
1 Faculty (Specialisation in school leadership,
management and community engagement/School
Management Committees)
Division of ICT 1 Professor (HoD) 1
1 Faculty (1 for CAL/ICT for student learning -
integration of ICT in Teaching learning & ICT
Initiatives (NTP, Prashikshak)
Division of Programme
and Monitoring 1 Professor (HoD) 1 1 Faculty (Specialised in educational planning)
Academic post 30
Library and
Documentation Cell
1 Librarian
1 Assistant Librarian
1 Professional
Assistants
3
1 Librarian
1 Assistant Librarian
1 Professional Assistant
Administrative
Division 7 7
3 Administrative Officers
1 Deputy Comptroller of Accounts (DCA)
1 Publications Officer
2 Editor/Assistant Editor
Technical Staff 5 5 2 - Professional Assistant for Library and
Documentation Division
DRAFT DOCUMENT
103
Name of
Division/Department
Faculty Designation Total
Faculty
Number
Details of Faculty
(Pre-school and
Primary)
Details of Faculty
(Upper Primary,
Secondary and Sr.
Secondary)
3 - Technical staff for different departments
(computer assistant, semi-professional assistant,
laboratory assistant)
Project Staff 6 6 Project Fellows and/or Consultants on
contractual basis
*States and UTs have the flexibility to adopt the departments suggested as per need.
• Total 15 States/UTs have population 1 crore and below as per the Census 2011. These are Himachal
Pradesh, Tripura, Meghalaya, Manipur, Nagaland, Goa, Arunachal Pradesh, Puducherry, Mizoram,
Chandigarh, Sikkim, Andaman & Nicobar Islands, Dadra & Nagar Haveli, Daman and Diu and
Lakshadweep
• Qualification of all the academic posts needs to be in consonance with NCTE norms.
2) SCERTs need to work under the Department of School Education: SCERT is the apex
body of academic support responsible for providing highest standards of student and teacher
education from pre-school to senior secondary stages. It is therefore important that all
SCERTs operate preferably under the Department of School Education of the State/UT
Government. SCERT is ultimately responsible for ensuring that quality at all levels of
school education is provided in an equitable and inclusive manner. Given the linkages
among all the stages of school education, covering all the levels of education by one
organisation in collaboration with other relevant agencies/institutions, will have a catalytic
effect on the quality of school education. In order to ensure this, SCERT should be
responsible for setting up the benchmarks for quality educational outcomes across all levels,
based on the findings of national and international research study on quality improvement.
They should also be equipped and alert in making changes in these benchmarks from time to
time as required.
In order to set and achieve the requisite benchmarks, the SCERTs need to conduct the following
activities:
i. Curriculum & Material Development
• Develop contextualised student curriculum aligned to national frameworks and
international best practices for pre-school, elementary, secondary and senior
secondary levels.
• Develop textbooks and other forms of learning material for students
ii. Teacher Education & Capacity Building
• Develop curriculum for pre-service teacher education for pre-school and
elementary teachers whilst also monitoring the quality of education imparted in
DIETs and other TEIs
• Develop and implement rigorous, need based programs for academic &
leadership capacity for teachers, heads of schools, teacher educators and
education administrators supporting pre-school, elementary, secondary and
senior secondary levels with the support of DIETs and other State Allied
Institutions, if any.
DRAFT DOCUMENT
104
iii. Research, Monitoring & Evaluation
• Define clear, coherent and effective student learning indicators/outcomes in order
to establish clarity at all levels of State administrative and academic machinery
• Develop effective evaluation processes to empower the state education
department to assess educational outcomes in various forms, including but not
limited to student achievement, teacher performance and teacher educator
performance.
• While students’ academic performance shall remain the ultimate yardstick to
determine whether the SCERTs have succeeded in their mission, indicators can
be developed for students, teachers, clusters, blocks and districts to continuously
monitor and evaluate the success of the initiatives of the SCERT. This will help
the SCERT determine its performance, alter its strategies and continuously work
towards meeting its ultimate objective.
• Undertake contextual and academically rigorous research projects which will
inform the policy making process of the state education department
3) SCERTs need to have a common nomenclature: It is observed that different states follow
different nomenclature for the SCERT, e.g., SIE, SCERT, DSERT, Academic Authorities,
etc. It is recommended that all States follow a uniform nomenclature going forward i.e., the
State Council for Educational Research & Training (SCERT).
4) SCERTs need to function as Autonomous Institutions: To act as autonomous bodies,
SCERTs could get registered under the Societies Act 1960 for generating funds to support
their academic and technical requirements and for having financial autonomy. In
consonance with providing autonomy, an accountability framework for SCERTs may be put
in place by the State Government.
5) SCERTs need to be the vigilant of their role under RTE Act: Under section 29(1) of the
RTE Act, the State Government has to appoint an academic authority to lay down the
curriculum and evaluation procedure which would be followed by all schools in the
elementary level. Given SCERT’s existing mandate, the SCERTs are notified as the
academic authority to perform this function. SCERTs should also be responsible for
monitoring the learning outcomes of the students on a regular basis. Besides, the SCERT
needs to work with State Commission of Protection of Child Right guiding them
academically on the concerns of protection of child’s rights, children from corporal
punishment and other kinds of harassment, inclusion of third gender in schools, etc. The
SCERTs need to come out with a framework of Classroom Pedagogy contextualised to the
needs of their states, so as to ensure an inclusive and stress free classroom.
6) SCERTs need to be recognized as nodal agency for In-service Teacher Education:
SCERTs need to prepare an annual teacher in-service training calendar for pre-school,
elementary, secondary and senior secondary teachers with active participation of all
Stakeholders and other TEIs. SCERT has to play an active role in terms of developing
training modules and strict compliance of the annual training calendar. The recommended
number of days of teacher training (per year) will be regarded by SCERT only as suggestive,
DRAFT DOCUMENT
105
so that they do not interfere with institutional autonomies of SCERT or worse lead to a
compromise on quality to meet quantity targets.
7) SCERT to develop a Training Management System (TMS): TMS and Professional
Development Record for teachers is required in every district to be able to consolidate and
track various professional development activities across the cluster, block and district and
even at the state and national levels, provided by different agencies, all directed at teachers.
Currently the information on training is either kept in hard copy form or is unavailable more
so capturing data for financial accounting rather than training management. The TMS could
be built on the information available in the State Education MIS to address planning issues
pertaining to in- service teacher training. This system should manage and track the trainings
for every teacher i.e. the management of a training delivery system to ensure that there is a
rational, efficient way to allocate/call the right teachers for the right training and to track the
trainings received. In the future, efforts could be made to align this to the effectiveness of
teacher trainings on students’ learning outcomes.
A few state education departments have developed different Management Information
System (MIS) for capturing teacher database and teacher educators. These MIS systems are
housed under different departments which are not necessarily, directly aligned to
interventions on academic development or teacher development. The National Teacher
Platform portal DIKSHA and PRASHIKSHAK Portal from MHRD/NCTE are available for
state integration and adoption, to further improve the effectiveness of teacher education data
systems across the States. SCERT should be designated as the nodal body for integrating the
monitoring, adoption and outreach of all related portals effectively across the State. As the
academic authority, it is envisioned that Technology in teacher education could be adopted
in a more effective way by all the SCERTs.
8) SCERTs need to lead major Quality Academic Initiatives: It is proposed that the entire
fund flow for in-service training, administrators training, Curriculum Development and
Research up to senior secondary level would be routed through the SCERT either directly or
in such a manner that entire budgeting, accounting and utilization of such funds will become
the responsibility of SCERT. The planning, design & implementation of the quality
initiatives should be led by SCERT and the State may allocate additional funds and source
funds from CSR/PPP models.
9) SCERTs need to be the Nodal Academic Authority for Pre-school Education: All State
departments providing pre-school education (like WCD-ICDS department etc.) need to work
in close collaboration with SCERT to develop pre-school curriculum and training support.
SCERT need to develop a monitoring system for school readiness of children entering into
the primary level.
10) SCERTs need to actively drive Social Equity through Education: The SCERTs need to
drive equity interventions in the state working towards building social equity across all
facets of education - specifically in textbooks, training design and implementation, and
implicit educational practices within the classroom and school in more focussed way.
DRAFT DOCUMENT
106
Faculty and staff across all departments should be empowered to reflect and work on
understanding, analysing and addressing intersectional issues arising due to caste, gender,
and religious inequities, addressing the needs of children with special needs, eliminating the
spate of dropouts from schools by undertaking relevant programs.
11) SCERTs need to have a Regulatory Mechanism for NGO’s Interventions: Each state
has several NGOs working to improve various aspects in education. Understandably, these
NGOs have their own vision, agenda and capacities based on their priorities and interest
areas. In order to best use the expertise, and additional aid provided by NGOs, the SCERTs
must be empowered to develop a sound strategy for partnerships and set the areas of
interventions for collaboration with these NGOs. They should also have processes in place
to measure their impact.
12) Structured Support for Academic Capacity Building of SCERTs to be set up: NCERT
needs to provide a structured support by actively increasing the rigor and consistency of
capacity building programmes for SCERT faculty through their institutions (such as NIE,
RIEs, PSS Central Institute of Vocational Education and CIET) and also by creating
opportunities for faculties of SCERT to work with international experts. NCERT needs to
design variety of programmes and courses- short term and long term as per the needs of the
SCERTs. NCERT need to closely work with the SCERTs in framing and executing regional
conferences for best practice sharing and exchanges between different SCERTs across the
country. NCTE and NCERT needs to support the SCERTs for developing and revising the
teacher education curriculum and other teaching learning material.
13) Benchmarking Framework for SCERTs: NCTE/NCERT/NIEPA need to build a
benchmarking framework for quality assurance in all SCERTs and support mechanisms
based on the benchmarking results.
14) SCERT/SIE as nodal agency for DIKSHA: To ensure effective implementation and usage
of DIKSHA, national teacher platform, the SCERT/SIE would be the nodal agency, for its
implementation in the States and UTs.
15) Recruitment: High quality personnel need to be recruited for the SCERTs under Teacher
Education Cadre. As already mentioned in the CSSTE Guidelines 2012, the salary and pay
scales of UGC need to be followed for the academic positions. However, state can have their
own pay scale as per their state norms. Career Advancement Scheme should be provided for
internal upward mobility. State Government needs to work to words having a separate
teacher education cadre for SCERTs/DIETs.
16) Restructuring of Programme Advisory Committee (PAC) and Research committee:
The PAC and Research Committees may be re-constituted to make them more effective. At
least two meetings of these committees may be held in a year to discuss about all
programmes of the SCERTs. In addition, considering the importance of research, every
Council needs to set up Educational Research and Innovation Committee.
DRAFT DOCUMENT
107
Organogram-1: Proposed Revised Structure of Programme Advisory Committee (PAC)
Organogram-2: Proposed Research Committee for SCERT (Based on NCERT Model)
Director, SCERT or the senior
most concerned Official
Joint Director or Vice Chairperson or
senior concerned Official
Heads and
one faculty
of Divisions
of the SCERT
Principals*
of 2-4 DIETs
(1 member
per 10
DIETs)
Representative
of SPDs of SSA
and Acad.
Officer from
Board
1 member*
from Social
Inclusion
Group
5 members*
1each from NGO,
RIE (NCERT)
IASE, CTE and
University
Head of
PMD/
Division
(Member
Secretary)
3 members*
from other
state
educational
institutions
 Guide and Review the Institute’s Programmes & Activities.
 Promoting Innovation.
 Coordination among Institutions.
 In case of senior most concerned official being chairperson and vice
chairpersons of the committee, Director/Joint Director will the
member and member convener of the Committee
1.*To be nominated by the competent authority
2. Term of the Committee need to be three year
Director & Joint Director, SCERT
Representative of
SPDs and Acad.
Officer from
Board
Heads of all
the Divisions
of the SCERT
Principals of 2-4
DIETs (1 member
per 10 DIETs)
nominated by
Director, SCERT
8 members 1 each from
NGO, RIE (NCERT) IASE,
CTE, Univ and other
state educational
institutions nominated
by the State Govt.
Head, Research
Division, SCERT
 Guide, Review and Approve Institute’s Research Programmes &
Activities.
 Promoting Innovative Research
 Coordination among Institutions for collaborative research projects.
 Support DIETs for Conducting Research
DRAFT DOCUMENT
108
6.1.5 Programmatic Interventions of SCERTs/SIE
1) Strengthening of physical infrastructure: Suggested Infrastructural requirements for
the SCERT are given in (Annexure-V(a) and V(b)). Each State will have to assess its
needs in terms of faculty and infrastructure depending upon actual demand for various
facilities and their current availability. Once the State Government takes a decision to
restructure the SCERT, it shall issue a Notification to that effect, specifying the new
structure, staffing pattern and strength. Strengthening of physical infrastructure will
also include establishment of Special Cells in SCERTs and Equipment for this
purpose.
2) Salary for Academic Posts: Salaries of faculty and staff of SCERT in respect of
additional posts sanctioned and filled up after the introduction of the revised scheme
(2012). A strategy to ensure that SCERTs have relevant academic expertise and are
able to retain them, is required on four fronts:
a) Appointment of faculty with NCTE laid qualifications and experience; this must
include fresh appointments along with opportunities for promotion within the
education cadre.
b) Capacity building of faculty must be provided so that over time faculty acquires
appropriate expertise in subject areas of relevance to teacher professional
development/teacher education and to do research in education.
c) Opening up a few visiting positions to enable teachers and others to spend short
period of time in the SCERT and work with student teachers or teachers and teacher
educators.
d) Creating a cadre of teacher educators in the State to serve the academic resource
institutions or direct recruitment could be considered.
3) Teacher Training: SCERTs should be designated as the Nodal Agency for all teacher
trainings. For this purpose, the role of the SCERT has been re-envisioned:
• SCERT to prepare a combined annual teacher in-service training calendar for
elementary as well as secondary teachers with active participation of various state
agencies and international agency (if any) to provide quality training programmes
while avoiding duplicity and repetitions of the similar nature of programme
conducted by different concerned agencies. SCERT to play an active role in terms of
development of training modules.
• SCERTs to ensure strict compliance of its training calendar.
• Active role of the SCERTs in terms of development of training modules.
4) Program & Activities: A strong programme of capacity building will need to be
instituted in the State and made available to SCERT/SIE faculties. A range of
professional growth and capacity building opportunities need to be conceptualized and
made available to the faculty.
DRAFT DOCUMENT
109
5) Specific projects for Research activities: Every member of faculty must be involved in
carrying out a small or medium research study. Preference in terms of quantum of
funding could be given to research studies that are carried out independently or
collaboratively between TEIs and Universities/NGOs. Action Research Projects in
which faculty collaborate with school teachers may also be given preference in funding.
Faculty should be required to present their ongoing research at seminars and other
forum. Faculty should be encouraged to publish their work and write in the journals,
magazines and newspapers.
6) Technology Support to SCERT: The core aim of introducing technology in teacher
education is to develop and promote openness for new thinking in an atmosphere of
innovation through introduction of methods that are interactive, non-threatening and
self-paced – and move away from mechanical text-based, chalk and talk methods.
Integrating ICT into teacher education is also necessary for bridging the digital divide
between Government and private teachers by providing opportunities to effectively use
technology to further educational objectives.
7) Annual Grant of SCERT: Annual grant to meet day-to-day expenses, hiring of
Resource persons/Experts for Teacher Training, purchase of library books/periodicals,
small office/library equipment’s, stationary, office expenses, etc. will be provided.
6.2 District Institute of Education and Training (DIETs)
6.2.1 Introduction
DIETs were envisioned in the NPE, 1986, and were created by the Government of India,
MHRD in the early 1990s to strengthen elementary education and support the decentralization of
education to the district level. DIETs were conceived as the third addition- district level- tier to the
support system, which would be closer to the field, and therefore more alive to its problems and
needs.
The DIET is located at an important level of decentralization - the District. However, they
have remained marginal to the key activities of the States in teacher professional development and
school improvement; they are inadequately integrated into the State’s systems. There is, therefore, a
need to reformulate the vision of this institution so that DIETs can contribute to fulfilling the
mandate under the RTE Act in matters relating to continuous teacher professional development,
school support and improvement.
6.2.2 Institutional Vision
The Scheme envisages a strong district institution that would support pre-service and inservice work with teachers. To support the universalisation of quality education, DIETs are
visualized as a way to infuse the system with the following essential inputs:
1) Provision of Pre-service and In-service Teacher Education Programmes.
2) Organizing District level and State Level Educational Research on issues pertaining to
enrolment, retention, achievement, gender parity, proficiency and Drop outs.
DRAFT DOCUMENT
110
3) Facilitating Collaborative Action Research to enable practising teachers to address class
room issues.
4) Scouting Innovative Practices of Primary/Upper Primary teachers and disseminating them
among their colleagues by organizing periodic District Level Seminars and releasing News
bulletins.
5) Providing Resource Support to Non-Formal Education Sector by extending expertise in
developing curriculum and supplementary Learning Materials to adult learners.
6) Designing and developing trainer manuals for Anganwadi workers and for addressing Social
concerns such as Crisis and Disaster Management, Gender Sensitivity, Leadership Manual
for School Heads etc.
6.2.3 Role & Functions of DIETs
DIETs need not remain insulated from key sites of education decision-making and activity
at the district level, they must break their isolation and enter into active engagement and
collaboration with institutions at the District, Sub-district, State, National and International levels.
DIETs need to play complementary and coordinated roles so that the needs of schools and teachers
are met without suboptimal, repetitive and overlapping functions. The role of DIETs is as under:
1) DIET would be nodal institution at the district level to transact pre-service and/or in-service
training up to Senior Secondary level.
2) DIET would also be responsible for in-service training of school teachers (Classes 1 to 12),
if there is no CTE for the district or the existing CTE is not able to fulfil the requirement due
to inadequate capacity in relation to the total number of teachers to be trained.
3) DIET would also organise and support teacher professional development and leadership
development programs for Head Masters, senior teachers, and School Management
Committees.
4) DIET would serve as an Education Resource Centre for the district in conjunction with
BITEs, BRCs and CRCs.
5) Addressing district specific material development, action research programs for special
groups in the District.
6) Developing district academic plans and monitoring the quality of schools and teaching.
7) Designing interventions for direct support to schools and work with special groups in the
district.
8) Training Management System (TMS) and Professional Development Record for teachers is
required at every district to be able to consolidate and track various professional
development activities undertaken by teachers at various levels. The data should preferably
be available in the digital format.
9) DIET would design and implement direct work in schools serving special groups or schools
which are facing difficulties. This would be a field action project and would involve
continuous curriculum and pedagogic innovation, work with teachers and school heads,
work with community as well as assessing and overseeing children’s learning and all round
development.
10) Monitoring the quality of schools particularly in the light of the RTE Act, 2009. School
visits of faculty should be carried out within some academic framework and the data
maintained so that over the year, various visits to schools contribute to the formation of a
ground level understanding of schools to complement the statistics.
DRAFT DOCUMENT
111
11) Carry out consolidation and analysis of information on status of schools and learning to
provide feedback to BRCs and CRCs for school visits and institutional support. These could
also be the basis for deciding on various training to be offered and specific schools to be
supported.
12) Focus on regular documentation of special academic programmes for special groups, special
forms of interventions, e.g. for tribal children, girl child, etc.
13) Create forums as key spaces for the strengthening of reflective practice throughout the
education system.
• Support the organization of school quality review meetings.
• Subject forum meetings of teachers and/or teacher educators (from TEIs and MRPs as a
group)
• Seminars for teacher educators with opportunities for presentation of internal work and
invited speakers.
14) DIET may prepare of a Perspective Plan for five years which would guide its activities.
Further, it would prepare an Annual Work Plan (AWP) to guide all its activities in each
forthcoming year. The AWP would be reviewed mid-term and at the end of each year while
formulating programmes for the next year. The perspective plan would involve developing a
vision and deciding on a direction for the next 5 years and it would be approved by the PAC.
15) Monitor and guide the conduct of teacher training in the BRCs and CRCs. Provision for
lending of Master Trainers to BRCs and CRCs, if required.
16) Conduct specialized trainings such as leadership, evaluation & assessment, ICT, Inclusive
Education, Gender Sensitization, etc.
17) Facilitate in resourcing material for subject specific training at BRC/CRC level (using
available resources from online platforms such as E- Pathshala and SWAYAM).
18) DIET would coordinate between BRCs/CRCs and NGOs in the District who are
contributing in the area of teacher training.
6.2.4 Restructuring and Strengthening of DIETs:
In the present context, the role of DIETs is critical in providing quality Pre-service and Inservice teacher training to student trainees and in-service teachers. It is time that DIETs rise up to
the challenge and emerge as a robust unit for professional development of teachers and models for
the other private institutions in the districts as well. It was felt that there was a need to devise
suggestive measures on how to strengthen the relationship between the DIETs, BRCs and CRCs.
At the same time, the field realities revealed that large numbers of DIETs are not able to
optimally utilize the actual intake capacity for D.El.Ed programmes due to lesser demand. In such
cases, recruitment in DIETs also need to be restructured so that it is used more for in-service
training. Keeping this need for reappraisal in perspective, MHRD has developed a Guideline on
Strengthening of DIETs. This guideline is as follows:
1) Reconceptualization of DIETs: The following two Models have been devised through
grouping of states and UTs on the basis of detailed analysis of available data on
intake/enrolment in DIETs, intake/enrolment in Private Institutions running D.El.Ed.
programmes, vacancies of academic positions in DIETs, teacher vacancies in Govt. and Aided
Elementary Schools and number of sanctioned/functional BRCs and CRCs:
DRAFT DOCUMENT
112
i) Model-I: The States/UTs which have very few Private D.El.Ed. Institutions (below 5):
This model includes States and UTs having high % of enrolment in DIETs and very few
(<5) Private Institutions running D.El.Ed. courses. DIETs in these States could continue
with the existing model of imparting both Pre-service education and In-service training.
ii) Model-II: Enrolment of DIETs between 41 to 100%, which have high number of
vacancy in academic post and also high number of Intake in Pvt Institutions running
D.El.Ed. Courses: It comprises of States and UTs with good enrolment but with vacancy of
academic posts in DIETs above 35% with high level of vacancies of elementary teachers in
Govt. and Aided Schools and existing high number of intake in Private Institutions running
D.El.Ed. courses. These could follow a model of exiting Pre-service education in 50% of the
DIETs which could focus on conducting only in-service training programmes. Alternatively,
they could also follow a hybrid model; by reducing intake of pre-service students and
utilizing the physical and academic resources so freed for in-service training.
2) Restructuring of DIETs: In view of the existing challenges in ICT and need for expertise in
subject areas such as Evaluation and Assessment, considering that learning outcomes are now
to be formally evaluated, the following Academic Structure has been recommended for
strengthening the existing DIETs:
a) Proposed Academic Structure: DIETs were originally envisioned as having seven
academic branches, however in majority of the state’s most branches are either defunct or do not
exist. Keeping this in view and the existing challenges in terms of Education Technology,
Secondary and Pre-school Education, a revised organogram on Academic Staff Structure is
proposed.
Organogram-3: Revised Academic Structure of DIETs
Principal
Vice Principal
Pre-Service
Teacher
Education
Field Interaction
& Action
Research
Assessment &
Evaluation
Education
Technology &
Material Dev.
Teacher
Professional
Development
• Restructuring
• Integration Inservice with
TPD
• Dev. Of Master
Trainers
• Content and
Pedagogy
• Elementary and
Secondary teachers
• Planning &
Management
• Utilize existing
resources on
online platforms
e.g., SWAYAM, EPathshala, etc.
• District Resource
Centre
• Design and Analysis
• Plan for
Interventions
• Analysis of outcomes
• Identify problems for
research
• Supervision
• Action Research
• Feed into TDP, PSTE
etc
DRAFT DOCUMENT
113
The staff strength of a DIET would be the same as recommended in the Guidelines for
Implementation (CSSTE, 2012), which are as detailed in the table below:
Table-2: Academic & Non Academic Staff details of DIET
Posts Number
Academic Posts 25
Principal 1
Vice Principal 1
Senior Lecturers 6
Lecturers 17
Non-Academic Posts 24
Work Experience/Work Education Teacher 1
Librarian 1
ICT Support Staff 1
Statistician 1
Office Superintendent 1
Lab. Assistant 1
P.A./Steno (to Principal) 1
Clerk (including one for hostel) 8
Steno Typist/Data Entry Operator 2
Accountant 1
Maintenance Support Staff/Group D 6
3) Restructuring of Programme Advisory Committee (PAC) of DIETs: Programme Advisory
Committee (PAC) would serve to advice and guide and review the Institute’s plans,
programmes and activities. The PAC would meet at least twice a year, to approve the
Perspective and Annual plan of a DIET and monitor its functioning. A revised organogram on
PAC Structure is proposed.
Organogram-4: Revised Operating body of PAC of DIETs
* Joint Director in the case of Andhra Pradesh
District Collector or Chief
Development Officer (CDO)*
DIET Principal
(Member
Secretary)
District
Education
Officer
One BRC
Coordinator
DPO of
SSA & RMSA
Representative
of Director
SCERT
One CRC
Coordinator
One NGO
Representative
• Guide and Review the Institute’s Programmes & Activities.
• Promoting Innovation.
• Coordination among Institutions within a districts
• PAC would meet twice a year.
DRAFT DOCUMENT
114
Its objectives would be to ensure:
• District focuses on programmes and activities
• Coordination among institutions
• Promoting innovation
• Ensuring that the States Education Plans are adequately reflected within the district plans
• Efficient use of resources and personnel to address education quality and teacher
requirements of the District.
The PAC may set up sub-Committees to monitor the progress of specific programmes and
activities of the DIET.
4) Establishing and strengthening linkages: DIETs at the district level are envisioned to
supervise the BRCs and CRCs for in-service training of teachers. Accordingly, a distinct
organogram at the state level is recommended with the Secretary, Education at the top of the
hierarchy and flowing down to the DIETs at the end. In addition, to strengthen linkages
between the DIETs, BRCs, CRCs and SCERT, a revisiting of the formal communication
structure between these 4 entities is recommended. In order to ensure strong linkage and better
coordination, it would be apt that the role of these institutions and linkage between them is
clearly brought out.
5) DIETs as Autonomous Organisations: Explore avenues for channelizing funds for in-service
training of teachers through:
• Explore avenues for additional funding in DIETs e.g. The Rajasthan State Government has
made available some untied funds @ Rs. 10-12 lakh per DIET annually. This amount is
collected through revenues generated from entrance examinations conducted in Government
Teacher Education Institutions @ Rs.1 per child.
• States and UTs could also encourage their DIETs to conduct training of teachers from Private
Teacher Institutions in the districts. This would help in generating additional funding to the
DIETs and at the same time provides avenues for training private school teachers.
• DIET campus could also be made available for running classes under Open Schooling
&IGNOU, which would also help in generating additional funding e.g., DIETs& CTEs in
Assam are following this practice.
6) Incentivizing DIET Faculty: Some measures that can be adopted for incentivizing DIET
faculty are:
i. Identify National Institutions/Universities for mentoring of DIET faculty to develop
expertise in subject areas of relevance to Teacher Professional Development.
ii. Incentives in the form of an increase in salary to be given to those teacher educators who
voluntarily come on deputation to DIETs on the lines of the current practice of central
government where a 30% increase is given in basic pay of the salary of officers/officials
coming on deputation to Government Training Institutes. A 5 to 10% incentive on the basic
pay could be considered.
iii. Exposure to international practices in Teacher Education through MoUs with established
Teacher Education Universities such as: National Institute of Education (NIE), Singapore:
Singapore has consistently been the gold standard for education and teacher education in the
DRAFT DOCUMENT
115
world. NIE is the only teacher training institute in the country which trains and produces all
types of teachers.
• Malaysia: Teacher Education in Malaysia occurs in two levels, at the university and
college level (Teachers colleges) i.e., Institute of Teacher Education Model and University
Model. A teacher with a bachelor’s degree from IPG can teach at the primary level,
university level bachelor’s degree supplies teachers to secondary schools.
iv. Developing a culture of sharing of ideas and experiences through exposure visits for sharing
of best practices between and within states.
6.2.5 Programmatic Interventions of DIETs:
1) Strengthening of physical infrastructure: The specifications for the strengthening of
existing DIETs are mentioned in Annexure-VI.
2) Establishment of New DIETs: The New DIET can be sanctioned in districts created up to
31st March, 2017. The specifications for physical infrastructure and related facilities for a
New DIET are mentioned in Annexure-VI.
3) Salary for Academic Posts: Salaries of faculty in DIETs, posts sanctioned and filled up
after the introduction of the revised scheme (2012). A strategy to ensure that DIETs have
relevant academic expertise and are able to retain them, is required on four fronts:
a) Appointment of faculty with NCTE laid qualifications and experience; this must include
fresh appointments along with opportunities for promotion within the education cadre.
b) Opening up a few visiting positions to enable teachers and others to spend short period
of time in the DIET and work with student teachers or teachers and teacher educators.
c) Creating a cadre of teacher educators in the State to serve the academic resource
institutions or direct recruitment could be considered.
4) Program & Activities: A strong programme of capacity building and professional growth
will need to be instituted for DIET faculty.
5) Specific projects for Research activities: Every faculty member must be involved in
carrying out a small or medium research study. Preference in terms of quantum of funding
could be given to research studies that are carried out independently or collaboratively
between TEIs and Universities/NGOs. Action Research Projects in which faculty collaborate
with school teachers may also be given preference in funding. Faculty should be required to
present their ongoing research at seminars and other forum. Faculty should be encouraged to
publish their work and write in journals, magazines and newspapers.
6) Technology Support to DIET: The core aim of introducing technology in teacher
education is to develop and promote openness for new thinking in an atmosphere of
innovation through introduction of methods that are interactive, non-threatening and selfpaced – and move away from mechanical text-based, chalk and talk methods. Integrating
ICT into teacher education is also necessary for bridging the digital divide between
Government and private teachers by providing opportunities to effectively use technology to
further educational objectives.
7) Annual Grant of DIET: Annual grant to meet day-to-day expenses, hiring of Resource
persons/Experts for Teacher Training, purchase of library books/periodicals, small
office/library equipment’s, stationary, office expenses, etc. will be provided.
DRAFT DOCUMENT
116
6.3 Block Institutes of Teacher Education (BITEs)
6.3.1 Introduction
There are a large number of districts having high concentration of SC/ST and Minorities
where there is an urgent requirement of setting up elementary pre-service teacher training
institutions to ensure preparation of elementary school teachers from amongst persons from these
communities. As per the Guideline for Implementation (CSSTE, 2012), it was decided to establish
196 BITEs - one such Institute in a block of each of the 90 Minority Concentration Districts
(MCDs) and the SC/ST dominated districts (other than the block in which a DIET is sanctioned),
for which Central assistance would be provided. However, during the Teacher Education Approval
Board (TEAB) meetings, request had come from different states and UTs for re-examine the
requirement of establishing a BITE. It was decided that instead of establishing a BITE, the intake
capacity of DIET in the neighboring area or district would be enhanced. Subsequently, as per the
specific requirements of each state and UT, so far, 81 BITEs have been sanctioned to be established
in the Minority Concentration Districts (MCDs) and the SC/ST dominated districts (other than the
block in which a DIET is sanctioned), for which Central assistance would be provided. The BITE
shall be a pre-service elementary teacher education institution.
6.3.2 Programmatic Intervention of BITEs
1) Strengthening of physical infrastructure: The specifications for physical infrastructure and
related facilities of a BITE are as per the norms and standards of the NCTE for D.El.Ed
institutions. The same specifications would apply for strengthening of existing BITEs.
2) Salary for Academic Posts: Salaries of faculty BITE, posts sanctioned and filled up after the
introduction of the revised scheme (2012). Appointment of faculty with NCTE laid
qualifications and experience; this must include fresh appointments along with opportunities
for promotion within the education cadre.
3) Technology Support to BITE: The core aim of introducing technology in teacher education
is to develop and promote openness for new thinking in an atmosphere of innovation
through introduction of methods that are interactive, non-threatening and self-paced.
Integrating ICT into teacher education is also necessary for bridging the digital divide
between Government and private teachers by providing opportunities to effectively use
technology to further educational objectives.
4) Annual Grant of BITE: Annual grant to meet day-to-day expenses, hiring of Resource
persons/Experts for Teacher Training, purchase of library books/periodicals, small
office/library equipment’s, stationary, office expenses, etc. will be provided.
6.4 Colleges of Teacher Education (CTEs) and Institute of Advanced Studies in Education
(IASEs)
6.4.1 Background
 The Colleges of Teacher Education (CTEs) and Institutes of Advanced Studies in Education
(IASEs) were established during the VII plan period under the Centrally Sponsored Scheme (CSS)
of Restructuring and Reorganization of Teacher Education (1987) which aimed that about 250
existing Secondary Teacher Education Institutes (STEIs) of an adequate standard and good
DRAFT DOCUMENT
117
reputation be financially assisted, on a project basis, towards becoming leading and innovative
institutes in the field of teacher education.
6.4.2 Modified Vision
CTE and IASE comes under the jurisdiction of Department of Higher Education in the
States. It is therefore proposed that these institutions will not be funded under this Scheme after the
completion of 14th Finance Commission period. Department of Higher Education will be requested
to take over complete funding of these institutions. However, programmatic support may continue
on project mode.
6.4.3 Programmatic Intervention of CTEs & IASEs
6.4.3.1Salary for Academic Posts: Salaries of faculty CTEs & IASEs, posts sanctioned and filled
up after the introduction of the revised scheme (2012), as per NCTE laid qualifications and
experience.
6.5 Teacher Training
6.5.1 Background
The purpose of the training is to facilitate a shift in the understanding of teaching and
learning as stipulated by the RTE Act, 2009 and NCF 2005 as reflected in the box below:
To Enact a Shift in Perspectives and Practices
From To
Teacher directed, fixed designs Learner-centric, flexible processes
Learner receptivity Learner agency, participation in learning
Knowledge as “given”, fixed Knowledge as constructed, evolving
Learning as an individual act Learning as a collaborative, social process
Disciplinary focus Multidisciplinary, educational focus
Assessment judgmental, mainly through
competitive tests for ranking, through narrow
measures of achievement, leading to trauma and
anxiety
Assessment for Learning, self-assessment to
enhance motivation, through continuous nonthreatening processes, to record progress over
time
6.5.2 Training of Untrained teachers
The RTE Act attaches immense significance to the role of teachers in improving elementary
education by making available professionally trained teachers for the school system. It provided a
time frame of five years for ensuring that all teachers in elementary schools are professionally
trained. Within this period, all teachers would need to acquire the academic and professional
qualifications prescribed by the academic authority under the RTE Act i.e., the NCTE. Accordingly,
the Amendment to the Section 23(2) of the RTE Act to extend the period for training of untrained
in-service elementary teachers to 31st March, 2019 has been passed by the Parliament on 1st
August, 2017. The same was notified in Gazette of India on 10th August, 2017. As per the above
amendment all untrained in-service elementary teachers working in Government, Government
Aided, and Private Unaided schools should acquire minimum qualification as laid down by an
academic authority, authorized by the Central Government, by 31st March, 2019.
DRAFT DOCUMENT
118
6.5.3 In-service Teacher Training
For in-service training, the country has a large network of teacher training institutions (TTIs)
including SCERTs and DIETs, which provide annual in-service training to school teachers. The
spread of these TTIs is both vertical and horizontal. At the National Level, the NCERT, along with
its 6 Regional Institutes of Education (RIEs) prepares a host of training modules and undertakes
specific programmes for training of teachers and teacher educators. Institutional support is also
provided by the NIEPA.
At the state level, the SCERTs prepare modules for teacher training and conduct some
specialized courses for teacher educators and school teachers. The CTEs and IASEs provide inservice training to secondary school teachers and teacher educators. At the district level, in-service
training is provided by DIETs. The BRCs and CRCs form the grass root level of institutions in the
vertical hierarchy for providing in-service training to school teachers. To emphasize the integration
of training structures and also to reiterate the academic position of SCERTs/SIEs in the States, the
SCERT would be the nodal agency in the state for conduct of Teacher’s Training. For this purpose,
the role of the SCERT has been re-envisioned to include:
• SCERT to prepare a combined annual teacher in-service training calendar for elementary
as well as secondary teachers training with active participation of various state agencies
and international agency (if any) to provide quality training programmes.
• Avoiding duplicacy and repetitions of the similar nature of programme conducted by
different concerned agencies.
• SCERTs to ensure strict compliance of its training calendar.
• Active role of the SCERTs in terms of development of training modules
6.5.4 School Leadership Development Programme (SLDP)
An effective school leadership is seen as the most important means to improve quality in
schools. To enhance leadership capability at the school level for institution building to deliver quality
education, SLDP is provided to all states and UTs for (i) training of RPs with support from National
Centre for School Leadership (NCSL) and (ii) HM training by State resource persons.
6.5.5 Training for administrative and academic support
1) For Head Teachers: As an educational professional, the Head Teacher needs training for
providing academic support to teachers in the school. The Head Teacher must also be trained in
leadership so that she/he can be a democratic and natural leader, not because of the position
she/he holds, but because of her/ his ability to administer a school where there is no
discrimination or bias on grounds of gender, caste or community. Thus, training for Head
Teachers would include the following components:
i. Orientation to the various sections of the RTE Act which directly relate to school
functioning;
ii. Orientation on emotional aspects to ensure that children who have been mainstreamed into
age-appropriate classes are supported;
iii. Keeping up-to-date records of teacher and student participation in various activities;
iv. Dealing with children with special needs and with adolescent children;
v. Academic and human resource management
DRAFT DOCUMENT
119
2) For Educational Administrators: The RTE Act places new responsibilities on Educational
Administrators to ensure that the provisions of the Act are implemented. A key reform in
training would be to change the inspectorial role of the educational administrator to that of a
mentor. Educational Administrators need training for (a) ensuring that financial, social, cultural,
linguistic and procedural barriers do not come in the way of children accessing and completing
school education, (b) undertaking periodic supervision of schools to observe the infrastructure,
facilities, use of teaching learning material, and other administrative aspects,(c) operationalising
the school syllabi, teaching learning process and learner assessment system, (d) developing a
proper system of academic and curricular support to serve the purpose of continuing professional
upgradation of teachers.
6.5.6 Training of Teacher Educators
1) Residential training programme for Teacher Educators/DIET Principals and
Faculty: Training programmes for teacher educators need to be instituted in the state/UT
including a range of professional growth and capacity building programmes, on the basis
of the actual needs and capacity of the institution, giving the physical and financial
implications of each activity subject to the norms of the Integrated Scheme.
2) Orientation/Induction training of Teacher Educators: The newly recruited teacher
educators of DIETs and BITEs should have strong grounding in curriculum, pedagogy
and research. For this purpose, an orientation/induction training programme for a period
of 10 days by the SCERTs/SIEs by utilizing the expertise of academicians from the
national/regional level institutions such as NCERT, NIEPA, RIEs, etc., is envisaged.
6.6 Academic support through Block Resource Centres (BRCs)/ Urban Resource Centres
(URCs) and Cluster Resource Centres (CRCs)
6.6.1 Introduction
BRCs/ Urban Resource Centres (URCs) and CRCs have been conceptualised to function as
academic resource centres. The RTE Act mandates provision of training facilities as well as good
quality education. The coordinators in BRCs and CRCs provide in-service training and on-site
support to schools for improvement of school quality. Given the significance of these structures, the
Integrated Scheme for School Education will strengthen support to BRC/CRC.
To improve the effectiveness of the block/cluster coordinators, there will be a focus on
improved selection criteria, which takes into consideration experience, qualifications and aptitude
for training and research. There will also be focus on constant skill enhancement through appropriate
training programmes that will help Resource Persons grow into teacher mentors-cum-educators.
Functional linkages of BRCs and CRCs with DIETs and district level resource groups will also be
strengthened. BRCs and CRCs will support the entire schooling system i.e., classes 1-12. In urban
areas, academic resource centres would be set up on the lines of BRC to cover 10-15 CRCs. If the
municipality or town development authority has academic staff, they may be deployed in the URCs.
On an average, one CRC Coordinator may be placed in charge of upto 18 schools in a block.
DRAFT DOCUMENT
120
6.6.2 Roles and Functions of BRCs
(a) Function as a repository of academic resources including ICT, science & math kits,
teaching learning resource material indifferent curricular areas, including pre-school
material, and material for children with special needs;
(b) Maintain and constantly update databases of education experts from nearby Teacher
Education institutions, NGOs, Colleges/Universities who could participate in Resource
Groups for different subject areas and themes;
(c) Ensure regular school visits and on-site academic support to address pedagogic issues and
other issues related to school development;
(d) Organise in-service teacher training based on teacher needs as observed during school
visits;
(e) Participate in monthly teacher meetings organised at the CRCs to discuss academic
issues and to design strategies for better school performance;
(f) Consult with school management committee, community members and local
authority for formulating school development plans; and
(g) Design a comprehensive quality improvement plan for the block/cluster and
implement it in a time bound manner.
6.6.3 Role and Functions of CRCs
(a) Function as academic resource centers with adequate resource/reference materials for
concerned teachers;
(b) Undertake regular school visits and provide onsite academic support to teachers;
(c) Organise monthly meetings to discuss academic issues and design strategies for better
school performance.
(d) Visit and hold meetings with members of the SMCs and other local bodies for school
improvement, support SMC in school development plan.
(e) Ensure that the special training programmes are properly designed and implemented
in the cluster for out-of- school children and securing their admission to ageappropriate classes.
6.6.4 Re-envisioned role of BRCs and CRCs as per the Guideline on Strengthening of DIETs
a) Work under the guidance of DIETs with regard to preparation and conduct of in-service
programmes.
b) Involve DIETs in the development of School Development Plan and especially on
matters relating to teacher professional development.
c) Organize subject specific training with the help of DIETs.
d) Monitoring of Schools in close coordination with DIETs.
6.6.5 Programmatic Intervention of BRCs/URCs and CRCs
BRC/URC: There would ordinarily be one BRC in each Community Development (CD)
Block. In states, where the sub-district educational administrative structure like educational blocks
or circles have jurisdictions which are not co-terminus with the CD Blocks, the State may opt for a
BRC in each such sub-district educational administrative units. However, in such a case the overall
recurring and non-recurring expenditure on BRCs in a CD Block, should not exceed the overall
expenditure that would have been incurred had only one BRC per CD Block been opened.
DRAFT DOCUMENT
121
a) The following resource support may be provided to BRCs/URCs:
i) Six Resource persons for subject specific teaching
ii) Two Resource Persons for Inclusive Education for children with special needs.
iii) One MIS Coordinator and one Data Entry Operator.
iv) One Accountant-cum-support staff to be appointed on contract basis. These
accountants will be mobile and provide support to schools and block to help them
maintain their record properly.
v) Additional grant for expanding the support to secondary level. This may include
deployment of additional Resource Persons, and recurring expenditure for
strengthening the BRC/URC.
vi) BRC/URC may be located in school campuses as far as possible.
vii)Provision for BRCs/URCs for furniture, computer, TLE/TLM, recurring
expenditure, meetings, contingencies etc.
b) The following resource support may be provided to CRCs:
i) CRC construction cost will be as per norms for additional classroom. The CRC may
be used as an additional classroom in schools on days when CRC meetings are not
held.
ii) Provisions for CRCs for furniture, computer, TLE/TLM, recurring expenditure,
meetings, contingencies etc.
6.7 DIKSHA (Digital Infrastructure for Knowledge Sharing)
6.7.1 Introduction
DIKSHA, a National Platform for Teachers, was launched on 5th September, 2017 to
accelerate and amplify solutions, experiments and innovations that are underway and/or being
undertaken in the areas of teacher training and professional development. With an emphasis on
technology, DIKSHA would be the biggest driver for quality intervention for school teachers,
teacher educators and student teachers in Teacher Education Institutions.
DIKSHA offers resources for teaching, learning, and professional development. It provides
open, modular and scalable technology that state governments and other organizations can
seamlessly integrate with their respective teacher-centric initiatives. To ensure effective
implementation and usage of DIKSHA (live at diksha.gov.in), the SCERTs/SIE would be the nodal
agency.
DIKSHA comprises of six verticals, which are as follows:
i) Teacher Profile and Registry: Teacher Profile will be collected for in-service teachers
and teacher educators by converging U-DISE, ShaalaKosh and any other existing data
base. The profile field has been finalized and the software is being developed. The
software will incorporate in-service Teacher Training details also.
ii) Teacher Professional Development: This will consist of modules contributed by the
Centre, States and other partners authorized by DIKSHA.
iii) Teaching and Learning Content: This will consist of content contributed by the Centre,
the States and by other authorised partners of DIKSHA.
DRAFT DOCUMENT
122
iv) Common Platform for Teachers to create/upload their own material/content: This will be
done by teachers and heads of Schools at State/UT level.
v) School Leadership Platform: This will be developed in discussion with NIEPA.
vi) Miscellaneous: This will include news and announcements featuring laws/ regulations/
circulars/ directions from the Centre and States, State Training Calendars, etc.
6.7.2 Programmatic Interventions of DIKSHA
1) National level: Funds will be provided for Development of Software, Project
Management Unit, Workshops, Meeting, etc.
2) State level: Funds will be provided for maintenance and upgradation of DIKSHA portal,
creation, curation and translation of digital content, capacity building, awareness and
communication drive, maintenance of teacher database etc.
6.7.1 Programmatic & Financial Norms: Strengthening of Teacher Education
The major components of the new scheme would be based on the following pattern. The
norms for the financial assistance available under the Scheme have been indicated and the States
can supplement/augment the provisions for various interventions from their own resources. Further,
the preference would be given to the states and UTs, in terms of fund provisions, who have
restructured their SCERT and DIETs, as per MHRD 2018 Guidelines, for Programme and
Activities and other related interventions.
Conditions for Central Assistance
1) Release of Central assistance to the State Governments in respect of the existing
DIETs/DRCs would be linked to the conditionalities that;
a) The State creates a cadre of teacher educators;
b) Fills up all the vacancies by 31st March, 2020
c) Thereafter, the vacancy should not be more than 5% of the sanctioned strength. In
respect of new DIET, all the sanctioned posts should be filled up within one year of
its establishment.
2) Non-recurring Central assistance to be provided for establishment of a New DIET in the
newly created districts (upto 31st March, 2017) on the basis of a Plan prepared by the
State Government in respect of the proposed DIET in accordance with the
infrastructural norms for establishment of a DIET. The proposal would be considered
only after the State Government has allotted land, along with necessary permissions, for
its establishment.
3) New DIETs would be sanctioned only to those States/UTs where all previously
sanctioned DIETs are functional.
4) Recurring assistance in respect of Program & Activities, Faculty development and
Specific projects for Research activities. Proposal for central assistance should be based
on an Annual Plan of activities which would be prepared by each DIET and SCERT on
the basis of the actual needs and capacity of the institution, giving the physical and
financial implications of each activity.
The activity wise programmatic and financial norms under Strengthening of Teacher
Education are at Appendix.
DRAFT DOCUMENT
123
ANNEXURE-V(A): INFRASTRUCTURAL REQUIREMENT FOR SCERT “MODEL 1”
Name of
Division/Department Faculty Designation Total Faculty
Number Infrastructure Requirement
Director, SCERT 1 Professor 1 1 Room
Jt. Director 1 Joint Director (Academic) -
Professor 1 1 Room
Division of Curriculum
Research and Development 1 HoD (Professor) 1 1 Room
Maths and Science 3 Associate Professors
4 Assistant Professors 7
13 Rooms –
Associate /Assistant Professors
Social Sciences 1 Associate Professor
3 Assistant Professors 4
Dept. of Language 2 Associate Professors
4 Assistant Professors 6
Dept. of Commerce Studies 1 Assistant Professor 1
Dept. of Art Education 1 Associate Professor
1 Assistant Professors 2
Dept. of Work Experience
and Vocational Education
1 Associate Professor
1 Assistant Professor 2
Dept. of Health and Physical
Education
1 Associate Professor 1
Dept. of Inclusive and
Special Education
1 Associate Professor
1 Assistant Professor 2
Dept. of Pre-school 2 Assistant Professors 2
Division of Educational
Research, Survey &
Assessment
1 HoD (Professor)
1 Associate Professor
1 Assistant Professor
3
1 Room for HOD
 1 Room forAssociate /Assistant
Professor
Division of Teacher
Education
1 HoD (Professor)
2 Associate Professors
2 Assistant Professors
5
1 Room for HOD
2 Rooms for Associate/Assistant
Professor
Department of Leadership
and Management
1 Associate Professor
1 Assistant Professor 2 1 Room for Associate/Assistant
Professor
Division of ICT 1 HoD (Professor)
1 Associate Professor
1 Assistant Professors
3
1 Room for HOD
1 Room for Associate/Assistant
Professor
Division of Programme and
Monitoring
1 HoD (Professor)
1 Associate Professor 2
1 Room for HOD
1 Room for Associate/Assistant
Professor
Academic post 45
Library and Documentation
Cell
1 Librarian
1 Assistant Librarian
1 Professional Assistant
3
All to be a part of Library
Administrative Division 7 7 One Hall or Two Rooms
Technical Staff 5 5 To be placed in the concerned lab
ET/CAL Lab
Project Staff 6 6 To be placed in concerned Division
Note: Infrastructural Requirement for SCERT “Model 1” also includes the following facilities
1 Seminar Room, 2 Class – Room’s for B.Ed Class (wherever required), 1 Room for “State Research
Support Group”, 1 Big Room approximately the size of Hall for library, 1 Hall where 100 Teacher Educators
or Teachers could be addressed, 1 Studio for recording video films, 1 CAL LAB, Provision of Labs/Special
Cells (5 Halls/Rooms), Cafeteria to accommodate 30-35 persons (1 Room), Store – (1Room)
DRAFT DOCUMENT
124
ANNEXURE-V(B):INFRASTRUCTURAL REQUIREMENT FOR SCERT “MODEL 2”
Name of Division/Department Faculty Designation Total Faculty
Number
Infrastructural Requirement
Director, SCERT 1 Professor 1 1 Room
Jt. Director 1 Joint Director (Academic)
- Professor 1 1 Room
Division of Curriculum Research and
Development 1 HoD (Professor) 1 1 Room
i) Maths and Science 2 Associate Professors
3 Assistant Professors 5 9 Rooms – Associate/
Assistant Professor
ii) Social Sciences 1 Associate Professor
1 Assistant Professors 2
iii) Dept. of Language 2 Associate Professors
3 Assistant Professors 5
iv) Dept. of Commerce Studies 1 Assistant Professor 1
v) Dept. of Art Education 1 Associate Professor 1
vi) Dept. of Work Experience and
Vocational Education 1 Associate Professor 1
vii) Dept. of Health and Physical Education 1 Associate Professor 1
viii) Dept. of Inclusive and Special
Education 1 Associate Professor 1
ix) Dept. of Pre-school 1 Assistant Professors 1
Division of Educational Research, Survey
& Assessment
1 Professor (HoD)
1 Associate Professor 2
1 Room for HoD
1 Room for Associate
Professor
Division of Teacher Education 1 Professor (HoD)
2 Associate Professors
1 Assistant Professors
4
1 Room for HoD
1 Room for Associate/
Assistant Professor
Department of Leadership and
Management 1 Associate Professor 1 1 Room for Associate
Professor
Division of ICT 1 Professor (HoD) 1 1 Room for HoD
Division of Programme and Monitoring 1 Professor (HoD) 1 1 Room for HoD
Academic Posts 30
Library and Documentation Cell
1 Librarian
1 Assistant Librarian
1 Professional Assistant
3
All to be a part of Library
Administrative Division 7 7 One Hall or Two Rooms
Technical Staff 5 5 To be placed in the concerned
lab ET/CAL Lab
Project Staff 6 6 To be placed in the concerned
Division
Note: Infrastructural Requirement for SCERT “Model II” also includes the following facilities
1 Seminar Room, 2 Class – Room’s for B.Ed Class (wherever required), 1 Room for “State Research
Support Group”, 1 Big Room approximately the size of Hall for Library, 1 Hall where 100 Teacher
Educators or Teachers could be addressed, 1 Studio for recording video films, 1 CAL LAB, Provision of
Labs/Special Cells (5 Halls/Rooms), Cafeteria to accommodate 30-35 persons (1 Room), Store –
(1Room)
DRAFT DOCUMENT
125
ANNEXURE-VI: SUGGESTED PHYSICAL NORMS FOR THE BUILDINGS OF A DIET
Item No.
Carpet Area Remarks
Per Unit
Sq.Ft.
Total
Sq.Ft.
1 2 3 4 5
1. Classroom 4 500 2000
Two classrooms may have
removable partition, and the other
two to be of lecture theatre type
(sloping floor). A smaller
classroom size may do if class size
is restricted to 40.
2.Seminar Room 1 400 400
3.Special Room:
(i) Science Methods Labs.
(a) For Phy. Science including
stores..
1 700 700
Labs to have built in Black Boards,
sinks with water taps, built-in
almirahs with glass planes. Etc. To
be fitted with Flexi Glass Board
(not Black Board) and Rubber
linings for windows, for dust
proofing. Adequate power sockets
to be provided.
(b) For Life Sciences including
Stores.. 1 700 700
(c) Cabin for one Faculty Member
I/C.. 1 100 100
(ii) Computer Lab. And Cabin 1 300 300
(iii) Resource Room for Education
of the Handicapped (including
space for Faculty Member I/C).
1 250 250
(iv) E.T. – Display –cum-Store 1 250 250
(v) Rooms for OAR Education
(a) For Visual Arts & Crafts like
paper & clay work
1 400 400 Room to have 3 water taps with
sinks.
(b) For Performing Arts (including
Store) 1 300 300 To be located in one corner of the
building so as to cause minimum
disturbance in other activities.
This need not form part of the
main building and may be
constructed to more economical
specifications e.g. with an A.C.
sheet roof.
(vi) Shed-cum-store for WE
Activities 1 600 600
(vii) Store Room-cum- Cabin for
Lecturer in Phy. Education 1 250 250
TOTAL – (3) 5350
4. Staff Rooms
(i) Principal’s Room (With PA’s
Cabin)
1 300 300
(ii)Room for Vice-Principal/Sr.
Lecturer I/C DRU 1 150 150
(iii) Cabins for Academic Staff 9 (each for
2
members
on an
average)
125 1125
(iv) Hall for Administrative staff to
sent OS, Accountant and Clerks 1 500 500
TOTAL – (4) 2075
5. Library 1 1000 1000
DRAFT DOCUMENT
126
Item No.
Carpet Area Remarks
Per Unit
Sq.Ft.
Total
Sq.Ft.
1 2 3 4 5
(Including Reading Area
Librarian’s cabin)
6. Miscellaneous:
(i) Gen. store room 1 225 225
(ii) Toilets 1 (One
Unit each
for ladies
& Gents)
225 450
Grand Total (1) – (6)
Add 30% for circulation
(Verandas, corridor, staircases,
and other spaces) and wall
thickness
 10000
Total Built-up Area 10000
Total Built-up Area
II. HOSTEL:
(Illustrative Norms for master
block
 120 6000
1. Double seats Room 50
2. Toilets.
2
(with
wash
basin)
400 800
3. Dining Hall, Kitchen & Store 1 1000 1000
4. Common Room 1 500 500
5. Hostel Office-cum-Dispensary 1 150 150
6. Hostel Store 1 200 200
TOTAL 8650
Add 30% for circulation
(Verandas, corridor, staircases, and
other spaces) and wall thickness
 2600
Total Built-up Area
11250 (or
say,
about
110 sq.
feet per
inmate)
11. Staff Quarters
1. Principal 1 1200 1200
2. For Faculty members (one of
whom will also function as House
Warden)
2 750 1500
3. For Watchman and one other
class IV staff 2 400 800
4. For other Academic &
supporting staff As many
TOTAL Built-up Area 3500
Note: The proposal may include facilities such as Girls’ common room, auditorium and canteen if
possible under overall financial ceiling.
DRAFT DOCUMENT
127
CHAPTER 7 – INFORMATION AND COMMUNICATION TECHNOLOGY (ICT) IN
SCHOOL EDUCATION
7.1 Introduction
Information and Communication Technology (ICT) has become one of the basic building
blocks of modern society. Many countries now regard understanding of ICT and mastering the
basic ICT skills (Communication, Collaboration, Creativity, Critical Thinking and Problem
Solving) as part of the core of education, along with reading, writing and arithmetic.
The Government of India seeks to strengthen the use of ICT in almost every sphere. To
promote the use of ICT in school education the Government of India had introduced ICT@ Schools
scheme in the year 2004 {by merging the scheme of Educational Technology -1972 and Computer
Literacy and Studies in Secondary Schools (CLASS)-1984}. The scheme was revised in the year
2010 and 2011 and a component to develop quality digital contents and incentives for teachers
(National ICT Award for School Teachers) was introduced. Till date, 88993 (60.8%) secondary and
senior secondary schools of both government and government aided have been covered under
ICT@ Schools scheme out of total 146303 schools. Besides, Computer Aided Learning (CAL)
program under SSA provided ICT infrastructure in Upper Primary schools, through provision of
Rs.50 Lakh per annum per district. The CAL scheme had a coverage of 92,886 out of 4,20,221
schools (22%) approximately. Under the Teacher Education plan, ICT infrastructure are also being
provided to the TEIs i.e. SCERTs/SIEs, DIETs, BITEs, etc.
Now the Digital India Campaign (2015) strives to transform India into a digitally
empowered society and knowledge economy by focusing on the three vision areas: i. Digital
Infrastructure as Core Utility to Every Citizen, ii. e-Governance and Services on Demand and iii.
Digital literacy and empowerment of citizen. The three cardinal principles of access, equity and
quality could be served well by harnessing the immense potential of ICT. Anytime anywhere
delivery of quality education employing ICT is one such implication of Technology in Education.
Development in India depends on the extent to which we are able to provide quality education and
skill training to all our citizens. Relevant use of technology will help to effectively solve India’s
problem of providing quality education and development of skilled human resources. ICT needs to
be used to provide high quality education, as well as, holistic education to each child including
children and youth with special needs and marginalized sections of the society.
ICT in any system and situation includes ICT infrastructure, creation, storage and retrieval
of digital resources, use of inter-operable software, technical support, networking using
telecommunication and satellite-based communication to enhance learning. The schools and TEIs
require a robust, reliable ICT infrastructure in order to effectively integrate ICT into all aspects of
school life and that of TEIs including teaching, learning and evaluation.
Education system in any country aims at preparing youth to participate creatively in the
establishment, sustenance and the growth of a knowledge society leading to all round SocioEconomic Development of the nation and the global competitiveness. Therefore, this integrated ICT
guideline for schools and Teacher Education Institutions subsumes all previous guidelines to
promote the following thrust areas:
DRAFT DOCUMENT
128
• Universal equitable, open and free access to a state of art ICT and IT enabled
learning environment, tools and digital resources to all students, teachers and
teacher educators (BITEs, DIETs, SCERTs, etc.)
• Development of local, localised and vernacular quality digital contents in regional
languages and to enable students, teachers and teacher educators to partner in the
development and critical use of shared digital resources.
• Enable sharing of ICT infrastructure for skill development of youth and digital
literacy of the community.
• ICT enabled assessment & evaluation of the learning outcomes of students in a
cumulative manner, tracking of the performance of the teachers, teacher
educators, managers etc.
• Development of professional networks of teachers, teacher educators, resource
persons in schools and TEIs to catalyse and support resource sharing, up-gradation
and continuing education of teachers and educators; guidance, counselling,
academic support of students, resource sharing, management and networking of
school managers/administrators etc., resulting in improved efficiencies in the
schooling process and TEIs.
• Promote research, evaluation and experimentation using ICT tools and ICT
enabled practices in order to inform, guide and utilise the potentials of ICT in
school and teacher education.
• Appropriate ICT interventions will be adopted to bridge the digital divide with
regard to education of girls, and other disadvantaged social groups, including
SCs/STs, minorities, CWSN, and other marginalized communities.
• A critical understanding of ICT is core to its success, hence, its benefits, risks and
limitations- safe, secure and ethical use of ICT needs to be infused in schools and
teacher education curriculum.
• Sensitization of all the stakeholders on the disposal of e-waste and contribute in
sustainable development.
7.2 Components
ICT implementation has essentially four components:
The first one is the partnership with State Governments and Union Territories
Administrations for providing ICT enabled education to Government and Government aided
schools and TEIs (SCERTs/ SIEs, DIETs and BITEs).
The second component is teacher related interventions, such as, provision for
engagement of an ICT teacher in schools, continuous capacity enhancement of all teachers in
the use of ICT, and recognition of teachers and teacher educators for innovative use of ICT in
education and learning, as a means of motivation. Every teacher is expected to innovatively
use ICTs in teaching learning process by selecting and integrating a wide variety of ICT tools
and Free and open-source software (FOSS) (including subject specific tools i.e. GeoGebra for
DRAFT DOCUMENT
129
Math; Stellarium, PhET simulations, Kalzium etc. for Science; Open street map and Marble
for Geography; concept mapping tools like Free Mind etc.)
Third one relates to the development of digital contents, curation and deployment of
existing digital contents mainly through Central Institute of Educational Technology (CIET),
National Institute of Education (NIE), NCERT, State Institutes of Educational Technology
(SIETs), SCERTs/SIEs and RIEs, and through outsourcing from different relevant agencies.
A variety of digital learning resources including audios, videos, interactive, multi-media
digital charts, maps, timelines, digital books, on-line labs activities, virtual and augmented
learning resources need to be developed and will be used to enhance teaching learning
process in schools and TEIs and learning outcomes among students, teachers, pupil-teachers
and teacher educators. These resources need to be disseminated through multiple modes
(transmission and non-transmission)- web-portal, mobile apps, DTH TV channels etc.
Further offline solutions need to be designed and used for delivery of digital contents through
Local Area Networking (LAN)/ Satellite connectivity. To augment the teaching learning
process, continuous professional development of teachers, skill training and promote lifelong
learning among all stakeholders in schools and TEIs. DTH TV channels should be used
through designing of virtual learning materials including lectures by best available teachers
from the State.
Fourth component is related to creation of Management Information System (MIS)
of the schools and TEIs ecosystem to enable cumulative assessments, evaluation, monitoring,
regular feedbacks and enhanced learning at various levels
7.3 Expansion of coverage of schools and TEIs in partnership with States/UTs
It shall be the endeavour to bring all Government schools from classes VI to XII, TEIs
under the ambit of the scheme in a phased manner.
7.3.1. Infrastructure
(A) Hardware and software: The scheme suggests that each school, TEIs as per
their requirement may choose to opt for the following:
Tablets/Laptops/Notebooks/PCs with Integrated Teaching Learning Devices,
Digital Boards with Content Management Systems and solutions
(CMS)/Learning Management Systems (LMS), FOSS, Operating System (OS)
and/or Servers with minimum 16 GB RAM, 1 TB Hard Disk, 1
Projector/LCD/LED/Plasma Screen, 1 Printer, 1 Scanner, 1 Web Camera, 1
Modem, Broadband/DTH-TV Antenna/Router, Receive only Terminal (RoT),
Satellite Interactive Terminal (SIT), Generator/ Solar Package, UPS, Video
Camera, Charging Racks, etc.
(B) Connectivity: It is suggested that the school, TEIs should have a broadband
internet connection of at least 2 MBPS bandwidth with a plan to upgrade in
future. The school and TEIs should also explore the Wireless links option to
DRAFT DOCUMENT
130
ensure sustainability. Efforts should be made to bring all the schools and TEIs
under the ambit of National Knowledge Network (NKN) or any other partners.
This may be done in convergence with BHARATNET.
(C) Power Supply: Wherever the power supply is unreliable it is suggested to
procure solar power panels and wherever they are not feasible a generator may
be used on a temporary basis. In such cases where the school and TEI is using a
generator facility; a recurring cost subject to a maximum of Rs.3000 per month
will be applicable. For reliable power supply, it is advised to take into
consideration the guidelines of Ministry of Power & Ministry of Renewable
Energy, Government of India for convergence of plans and services.
(D) ICT Infrastructure: The Tablets/ Laptops/ Notebooks would be installed in
charging rack(s)(portable) which can be kept in any of the classrooms/
Principal/Head Teacher room/ office room as per the availability in the school
and TEIs. If any school has existing ICT labs, the same may be used for keeping
charging racks.
7.3.2 Mode of Implementation
It is suggested to the States, UTs and Autonomous bodies, that in-order to implement
the program they may opt for any of the following models (uni/ multi model) as per their
requirement which includes: Outright purchase through Government e-Market
(GeM)/BOOT/BOO Model. For all the above-mentioned models, the Service
Providers/Original Equipment Manufacturer (OEM) would make available the ICT
infrastructure and learning services based on a signed agreement with the State, UTs and
Autonomous bodies. The payments upfront and periodic to the service providers and OEMs
will be subject to satisfactory deployment, maintenance and implementation of ICT
Infrastructure & Services. The States/UTs Govt. and Autonomous bodies shall be free to
partner with private organizations or integrate it with other similar schemes for
implementation of the ‘ICT in schools’ scheme including a provision for annual maintenance.
The Ministry of Human Resource Development shall consider the entry of the private sector
in any of the above-mentioned models. The NCTE and NCERT shall be associated with the
scheme in the context of teacher professional development through technology-enabled
learning.
7.3.3 Inclusive Education
Assistive technologies such as JAWS and SAFTA, Audio Books etc. and other
assistive technology-based solutions will be provided to students with special needs from
classes VI to XII and to TEIs. The Rehabilitation Council of India (RCI) would play an
important role in this area involving introduction and use of technology for the education of
Divyang/ Children with Special Needs and addressing the concerns related to Universal
Design of Learning (UDL).
DRAFT DOCUMENT
131
7.3.4 Financial Parameters
The assistance of the Government of India would be for the following items and up to
the limits indicated against each item:
a. Capital Expenditure (Non-recurring) (Rs.in
lakhs)
1. Tablets/ Laptops/Notebooks/PCs with Integrated Teaching Learning
Devices, Digital Boards with Content Management Systems/solutions
(CMS)/ Learning Management Systems (LMS), Free and Open Source
Software (FOSS) and OS and/or Servers with minimum 16 GB RAM, 1
TB Hard Disk, 1 Projector/ LCD/ LED/ Plasma Screen, 1 Printer, 1
Scanner, 1 Web Camera, 1 Modem, Broadband/DTH-TV Antenna/ ROT/
SIT, Router, Generator/ Solar Package/Panel, UPS, Video Camera,
Charging Racks, etc.
6.00
2. Operating System & Application Software, Open Source Video
Conferencing Software (FOSS may be preferred)
0.20
3. Furniture 0.20
Total 6.40
Note: The cost includes Annual Maintenance Contract for a minimum period of 5 years.
b. Recurring Expenditure (Rs.in lakhs)
1. E Content and Digital Resources 0.24
2.
Charges for Electricity/Diesel/Kerosene @ Rs.2000/- p.m. The
state may also use Solar Power-Hybrid solar instead, to ensure
Sustainability in which case this amount may be utilised for
providing additional e-resources. 0.24
3.
Internet connectivity (Tele communications/ satellite
communication/ OFC) @ 1000 PM 0.12
4. Financial Assistance for ICT Instructor @ upto Rs.15000/- p.m. 1.80
Total 2.40
Note: *1. In order to enhance the learning capacities of the students, the schools, TEIs in states/ UTs
and Autonomous bodies should optimise/maximise the numbers of Tablets/Laptops/PCs/Notebooks in
the classroom situation. Content Access Management devices (Offline, Online, Satellite Based)
should be used for effective classroom transaction.
2. The cost includes Annual Maintenance Contract (AMC) for a minimum period of 5 years. The state
and UTs needs to commit to take ownership of the project after completion of five years.
3. The state and UTs are provided flexibility in procuring suitable hardware and software under the
budget ceiling. However, all efforts should be made to procure and use Free and Open Source
Software (FOSS).
4. The ICT teacher in schools and TEIs shall provide assistance in implementation of the scheme
through hardware, software and ICT pedagogy integration in classroom transaction. Prioritization of
schools for ICT implementation will be given to schools providing greater coverage across
grades and number or students.
Keeping in view the current trends in technology and its usage various options such as
Tablets/ Laptops/Notebooks have already been suggested which requires minimum/no civil
infrastructure. However if any school and TEIs has any constraints towards such mobile
DRAFT DOCUMENT
132
solutions they may opt for preparation of labs for computers including civil repairs and
cabling, etc. depending upon their needs and resources. A combination of static & mobile
options may also be deployed. The hardware, software and mode of implementation should
be determined by the usage of ICT for teaching learning, digital resources availability,
delivery mechanisms & strategy rather than the other way round. Thus the teaching
methodology, e-resources for digital literacy an ICT based subject teaching should be decided
first and thereafter the planning for hardware and mode of implementation should be done.
7.3.5 Interventions for Teacher
Under the scheme, all Government schools and TEIs (SCERTs, DIETs and BITEs)
will have a minimum level of ICT infrastructure. It should be the endeavour to make all
students, teachers and teacher educators of these schools and TEIs, ICT literate. This would
involve formulation and transaction of curriculum and syllabus on ICT for each of the classes
from VI to XII and for TEIs at pre-service and in-service level
All Examination Boards in the country would be encouraged to offer ICT related
subjects in an integrated way up to class X and as electives at the Senior Secondary stage.
This scheme would encourage individual schools to offer such electives, so that a
large number of human resources with ICT skills/competencies can be built up in the country.
Similarly all the SCERTs/SIEs/DIETs/BITEs would design and integrate ICT in Education
and Learning components in the Pre-Service and In-Service professional development
courses.
7.3.6 Teachers’ Training
A. Pre-Service Training:
It will be necessary for all the TEIs to integrate ICT in teaching-learning in the preservice training courses meant for student teachers. The ICT curriculum prescribed by
National Council for Teacher Education needs to be implemented (NCTE Curriculum
Guidelines are at Annexure-VII).
B. In-Service Training: ICT in Education curriculum should be linked with induction
course developed by NCERT. (http://ictcurriculum.gov.in).
(I). Details of Induction training: First time induction training in ICT should be
provided to all teachers in the sanctioned schools for a period of 10 days (8 hours per day).
The details of training, curriculum and duration (80 hours- 40 hours face to face and 40 hours
online through MOOCs platform) to be provided are as follows:
DRAFT DOCUMENT
133
Sl. No. Topics of Induction training Hours
1. Introduction Session 0.30
2.
Introduction to ICT and ICT in Education Initiative taken up at
National level 8.00
3. Exploring Educational Resources through Internet 9.00
4. Communicating and collaborating with ICT 12.00
5. Safe, Secure and ethical use of ICT 6.00
6. Creating Educational Resources with ICT 24.00
7. Introduction to Assistive technology 4.00
8. Assessment and Evaluation using ICT 6.00
9. e-MIS 4.00
10. ICT - Pedagogy - Content Integration 6.00
11. Feedback 0.30
Total hours 80.00
 (II). Details of Refresher Training: Refresher trainings in use of ICT in teaching learning
should be provided to all teachers of the sanctioned schools. Refresher training is proposed to
be provided for 5 days (8 hours per day). The details of training and duration (40 hours- Face
to Face/Online mode- through MOOCs platform) to be provided are as follows:-
S. No Topics of Refresher Training
1. Internet as a learning resource
2. Development of Digital Contents
3. ICT for Teaching, Learning and Evaluation
4. Safe, Secure and Ethical use of ICTs
5. Building Communities and Collectivising
The trainings (induction and refresher) would be organized by the respective State
Governments/UTs in convenient batches at the SCERTs, SIEs, DIETs, BITEs, CTEs, IASEs,
etc. or such other training institutions as the State Governments/UTs find suitable. CIETNCERT would create a State Resource Group (SRG) in states and UTs selecting faculty from
TEIs and schools on ICT in Education and Learning at least 2 to 5 Master Resource
Persons/Key Resource Persons who will be providing their support for scaling the teacher
training in the respective states/UTs as Mentors.
7.3.7 National Award for the Teachers using ICT in Education
In order to motivate teachers and teacher educators to use ICT in school and teacher
education in a big way, National Awards for the Teachers using ICT would be given to 90
teachers every year. An amount of Rs. 1 crore would be kept aside for instituting National
Award for the Teachers using ICT for innovations in education. A selection process will be
followed by NCERT for short-listing and recommendation of required number of awardees to
MHRD-GoI.
DRAFT DOCUMENT
134
7.3.8 Creation of Management Information System of the Schools and TEIs
With the increase in the mandate and outreach of the scheme, an appropriate
management structure is needed at the national, state and district levels. The States/UTs and
Autonomous bodies are expected to develop an automated mechanism (eMIS), for the assets
procured under Integrated ICT Scheme, which shall include: Tracking Inventory for
hardware, software (including license compliance, vendors, POs, tenders etc.) to facilitate
online redressal of issues related to routine operation and maintenance of the scheme and
maintain transparency.
7.4. Digital Content Development
7.4.1 Development of appropriate digital content and its persistent and effective use
constitutes the core of this scheme. This task would be shared by CIET, Regional Institutes of
Education (RIEs), and Pandit Sundarlal Sharma Central Institute of Vocational Education
(PSSCIVE) of the NCERT, State Institutes of Educational Technology (SIETs), ET units of
SCERTs/SIEs, Institutes of repute having experience of education and development of digital
content and other wings of central and State Governments as required. Outsourcing to private
sector in a transparent manner may also be done.
Content creation/ acquisition being the critical factor for the success of the scheme,
the CIET- NCERT shall work towards utilising the full range of capabilities of the Indian
ICT sector. National level and State level committees should also be set up to assess the
nature of digital contents to be developed to enhance the learning capabilities of the students,
teachers, pupil teachers and teacher educators of schools and TEIs. Efforts should be made
on development of digital contents and building of portal/repository/OER/Mobile apps for
dissemination of best practices.
Digital contents developed by any of the stakeholders in the country are to be linked
with the dissemination platforms. The digital content should be platform agnostic/neutral.
The content should cover the hard-spots for all the grades.
• The content should be essentially mapped to NCERT, SCERTs/SIEs and other
state board curriculum. While development of digital contents, effort should be
made to design these in local, localised and regional languages
• It should contain 3D/2D immersive Videos
• The modules are to be created in a way that it supports a Teacher-led delivery
which requires continual teacher intervention to keep the focus on students
learning.
• The modules are to be created in a way that the topics covered are creatively and
pedagogically designed.
DRAFT DOCUMENT
135
7.4.1.1. Development of Infrastructure
Existing course contents of various teacher training programmes and curriculum
based digital contents offered across the country have little component of Educational
Multimedia, virtual realities etc. It is proposed to fill this gap by developing and deploying
the interactive multimedia, digital books, virtual labs etc. The content developed for various
subjects should be translated into other languages and adapted to a regional context so as to
avoid de novo efforts for each language. ICT based Science Lab, Math lab and Language Lab
should be established with integration of hardware & software.
7.4.2 Financial Parameters
Financial assistance would be provided to CIET, SIETs, SCERTs/SIEs, RIEs,
PSSCIVE and other institutes including outsourcing agencies for development of e-content,
based on the project proposals submitted by them. The norms for development of digital
contents shall be developed by CIET and disseminated among all the above mentioned
institutes for its adherence.
A variety of digital learning resources including audios, videos, interactives, multimedia digital charts, maps, timelines, digital books, on-line labs activities, virtual and
augmented learning resources need to be developed and will be used to enhance teaching
learning process in schools and TEIs and learning outcomes among students, teachers, pupilteachers and teacher educators. The content developed for various subjects at one
laboratory/institute would be translated into other languages at other laboratories and adapted
to a regional context so as to avoid de novo efforts for each language.
7.5 Programme Management
The proposal for using ICT should include the details of the infrastructure put in place
in the previous year as well as utilization in imparting more effective classroom teaching. The
states should share the POCs (Proof of Concepts) and Best practices and innovations for
sharing with other States. Details of the provision made in the State budget, including that for
the State share should be a mandatory requirement of ICT Plan. CIET, SIETs, RIEs and other
institutes etc shall also have to submit their annual work plans for various components of the
scheme for consideration by PAB.
The Recurring Grant will also be provided to the State/UTs for the period of 5 years
only from the year of implementation. Once the implementation report/Status is received
from the State, first instalment of the Recurring Grant will be released immediately on the
basis of the implementation report/basis. However, the release of the second instalments
recurring grant in the second and subsequent years would be based on receipt of utilization
certificate along with the progress report and audited statement of accounts in respect of
grants released till the end of the preceding year is furnished.
DRAFT DOCUMENT
136
The recurring grant, for the schools that have already been approved and where
implementation has been started, will be provided on the basis of the old ICT scheme. The
recurring grant, for the schools have been approved but are yet to be implemented by the
State, will be provided on the basis of the revised guidelines.
7.6 Management, Monitoring and Evaluation
The respective States would have an internal mechanism for overseeing the
implementation of the programme through a monitoring committee constituted for the
purpose. The main parameters for monitoring would include timely installation of requisite
hardware, including power supply, suitable software, engagement of teaching and
administrative staff, teacher training and extent of use of e-content developed at the multimedia labs by the teachers. The State Govt. shall undertake a monitoring mapping at each
level i.e. school, district, and State level.
For effective monitoring and evaluation, a web portal will be developed to enable real
time monitoring of the implementation of the project at various levels. The Management at
State/National level could view the status of implementation and also provide timely midcourse interventions. Successful innovations, experiences shall also be uploaded on the portal
so that all the stakeholders can make use of the best practices or innovations being carried out
by various States and Schools.

The PAB at the Ministry of HRD would also function as the Monitoring Committee.
In addition, the SIETs, CIET, RIEs and the State/UT Government submitting the proposal
would be required to submit progress report every quarter.

DRAFT DOCUMENT
137
ANNEXURE-VII
CURRICULUM FRAMEWORK: TWO-YEAR B.ED. PROGRAMME (BY NCTE)
Course EPC 3: Critical Understanding of ICT
Preparing teachers to use technology in a classroom is an important step for ICT enabled
education in the country. This course will focus on moving beyond computer literacy and ICT-aided
learning, to help student-teachers interpret and adapt ICTs in line with educational aims and
principles. It will explore ICTs along three broad strands; teaching learning, administrative and
academic support systems, and broader implications for society. ICTs have often been seen as a standalone subject, consisting of a finite set of proprietary applications, taught to children directly by
technology experts, bypassing teachers, which has diluted possibilities of teacher’s ownership,
enhancement of expertise and engagement. Seeing ICTs as an important curricular resource and an
integral part of education, according primacy to the role of the teacher, ensuring public ownership of
digital resources created and used in education, taking a critical perspective on ICTs as well as
promoting constructivist approaches that privilege participation and co-creation over mere access, are
principles that the course will help teachers explore. Applying these principles can support Teacher
Professional Development models that are self-directed, need-based, decentralized, collaborative and
peer-learning based, and continuous, in line with the NCFTE, 2009 vision for teacher education.
Since ICTs are technologies, along with developing such understanding, the course will also
help student-teachers to learn integrating technology tools for teaching learning, material
development, developing collaborative networks for sharing and learning. This learning can help
integrate pre-service and in-service teacher education, address traditional challenges of teacher
isolation and need for adequate and appropriate learning resource materials (MHRD, 2012). The
course will explore use of ICTs to simplify record keeping, information management in education
administration.
Communication and information sharing/ storing are basic social processes; new digital
Information and Communication Technologies (ICTs), by making these easier and cheaper, have
significantly impacted and are impacting our socio-cultural, political and economic spheres (Castells,
2011). The course will help student-teachers to develop an understanding of the shift from an
‘industrial society’ to a ‘post industrial information society’, where the production and consumption
of information is both easier/ simpler as well as important (DSERT Karnataka, 2012). This change has
positive and negative implications and possibilities for democracy, equity and social justice, all core
components of our educational aims. The course will help student-teachers reflect critically and act
responsibly to prevent how ICTs are used to support centralisation and proprietization of larger
knowledge structures; it will show student-teachers how ICTs can be adapted to support decentralized
structures and processes, as well as build the ‘digital public’ to make education a participatory and
emancipatory process (Benkler, 2006).
Curriculum Framework: D.Ed. Programme (by NCTE)
Course: Pedagogy across the Curriculum
Unit 4: Critical Study of ICTs and Developing Capacities
• Critical examination of the role of ICT in education and society
• Capacity development in the use of ICTs
• ICT – based teaching-learning approaches in schools and for teacher professional
development.
DRAFT DOCUMENT
138
CHAPTER 8 – VOCATIONALISATION OF SCHOOL EDUCATION
8.1 INTRODUCTION
8.1.1 Schools provide an environment for systematic teaching-learning to the learners for
acquiring knowledge, skills and attitude required to meet the varied aspirational needs and
educational goals. Vocationalisation of education refers to the inclusion of those practical
subjects or courses, which shall generate among the students some basic knowledge, skills
and disposition that prepare them to think of becoming skilled workers or entrepreneurs. It
serves as an instrument to bring about the connectivity between general education and
vocational education. It may be seen as an instrument for providing diversification of
educational opportunities, enhancing individual’s employability and enabling individual to
pursue higher education.
8.1.2 The Vocationalisation of School Education has been aligned with the National Skill
Qualification Framework (NSQF) notified by the Ministry of Finance. It has been developed
in a way that it links the various elements of vocational education in schools with those of the
general education, businesses and industry so that the vocational pass outs can exit with
employment-related skills. It envisages close partnership with the industry in the design,
development, delivery, assessment and certification of skills content.
8.2.1 AIMS ANDOBJECTIVES
8.2.1 The aim of introducing vocational education in schools is to prepare educated,
employable and competitive human resource for various sectors of the economy and the
global market. The main objectives are to enhance the employability of youth through
demand driven competency based, modular vocational courses, to bridge the divide between
the academic and applied learning and reduce the dropout rate in schools.
8.3 SCOPE
8.3.1 The Vocationalisation of School Education component aims to introduce vocational
courses along with general education subjects from Classes IX to XII. The vocational
subjects are to be introduced as an additional or compulsory subject at the Secondary level
and as compulsory (elective) at the Senior Secondary level. The scheme primarily covers
Government schools. Government aided schools, in those States/UTs where Government
schools have already been covered under the Scheme, may also be considered for financial
assistance as per the norms. Exposure to Vocational Education would also be provided in
Classes VI to VIII with an aim to provide opportunities to the students to orient themselves
with the skills required for the various occupations in a sector and to equip them to make
informed choices while selecting their subjects in higher classes.
8.3.2 The component would involve introduction of vocational education in schools,
capacity building of vocational education teachers/skill trainers, development of competency
based curriculum and teaching learning material, development of management information
system for monitoring and evaluation, and taking up innovative programmes under vocational
education.
DRAFT DOCUMENT
139
8.4 IMPLEMENTING AGENCIES IN STATES/UTs
8.4.1 The scheme will be implemented in the schools by the State/UT Governments through
the respective Departments of School Education and Boards of School Education.
8.5 IMPLEMENTATION MECHANISM
8.5.1 Selection of Vocational Courses
8.5.1.1 The selection of vocational courses by the States/UTs should be based on the
assessment of skill needs conducted nationally and locally. The States/UTs may conduct a
detailed mapping of the local job opportunities available or labour market requirements to
identify schools for introduction of the vocational subject. Documents supporting the
procedure adopted for selection of vocational courses may be annexed with the Annual Work
Plan and Budget proposals of the State/UT. In addition, States in consultation with the local
industry etc. will also identify the human resource needs at the local level. While selecting
the courses for the schools, the State /UT should ensure that local skill needs are
appropriately addressed and suitable opportunities of employment are available for the
students passing out in neighbouring areas. Besides reflecting the needs of skills across
sectors, courses that are introduced in schools may also be in tandem with the aspirations of
parents and students. While selecting the course, care should be taken by the States and UTs
to adequately map the diversity of skill needs. The NSQF compliant vocational courses to
be selected for Classes IX-X and XI-XII may preferably be in the same sector having
appropriate career progression in order to ensure optimum utilization of the infrastructure
created. Opting a single course for large number of schools may adversely tilt the supply of
skills vis-a-vis the demand. Over a period of time, in case the need so arises, the vocational
courses offered by the school can be considered for change in accordance with the skill
requirement.
8.5.1.2 The schools may offer two vocational courses in Classes IX-X and XI-XII, with 40
students in each section. Each course may be covered in the span of 2 years. NSQF
compliant vocational courses which require longer duration of training may be covered
in 4 years. If considered feasible, one vocational course may be offered in schools located
in rural, thinly populated areas, SFDs and EBBs etc.
8.5.2 Inclusion of Vocational courses in Scheme of Subjects
The Central/ State school Education Boards may make necessary amendments to
include the selected vocational courses in the scheme of studies both at secondary and
Senior Secondary level.
8.5.3 Selection of Schools
8.5.3.1 The proximity between the schools and industry/employer would be a major
consideration in the selection of schools for implementation of the scheme. Every school will
be required to have linkage with some related enterprise/ industry/ farm/ organization, etc.,
DRAFT DOCUMENT
140
for hands - on training, specialized quality assurance and other relevant aspects. With a view
to effect convergence at the grass root level, the State Education Departments shall also map
the spare capacity and infrastructure available in the Government and private run Industrial
Training Institutes and seek to utilize the same for providing hands on skill training to the
students through appropriate Memorandum of Understanding.
8.5.3.2 While selecting schools preference will be given to schools located in Special Focus
districts, Educationally Backward Blocks, in left wing extremism affected districts
aspirational districts and in districts with high dropout rates at the secondary level.
8.5.4 Classroom-Cum Lab/Workshop
8.5.4.1 State of the art classroom-cum-lab and workshop may be developed in the school to
ensure effective practical training of the students. Lab equipment and resources may be based
on the requirements of the subject and the financial limits. The state needs to ensure timely
procurement of the lab equipment and raw materials so that the lab is set up before the start of
the academic session.
8.5.4.2 An indicative list of tools, equipment and materials for setting up the lab/workshop
will be provided by Pandit Sunderlal Sharma Central Institute of Vocational Education
(PSSCIVE) in consultation with the respective Sector Skill Councils.
8.5.5 Equipment and raw materials
8.5.5.1 Tools, equipment and machinery for the development of soft and basic technical skills
would be provided to the schools. The list of the tools and equipment mentioned in the
curriculum developed by PSSCIVE would form the basis for procurement.
8.5.5.2 If required, the States may constitute a committee for finalizing the list of equipment
with the help of experts and the representatives from the respective Sector Skill Council.
Proper inventory and upkeep of all items purchased under the scheme should be ensured.
Procurement of tool and equipment through GeM Portal is recommended wherever course
specific tools and equipment list is readily available.
8.5.6 Programme Management
8.5.6.1 Collaborations in management will address administration and organizational reforms
in matters such as strategic planning and goal setting, increased autonomy to Principals and
teachers in procurements, finance, accounting, monitoring of performance standards, etc.
NGOs/voluntary organisations and Vocational Training Providers (VTPs) working with
various skill development scheme of Government of India may also be involved by the States
in order to utilize their experience and expertise in various domains, like project
management, training, etc. to facilitate vocational education in schools. Besides this, it is
advisable that states may have a dedicated cell for vocational education within the department
of school education.
DRAFT DOCUMENT
141
8.6 CURRICULUM AND COURSEWARE
8.6.1 The vocational curriculum should be learning outcome based. Besides curriculum, the
training package should include student textbook, teachers/trainers handbook, training
manual, teachers/skill trainers’ qualifications, assessment guidelines, multimedia packages
and e-learning materials. The curriculum would be referenced to the notified National
Occupation Standards/Qualification Packs developed for various job roles by the respective
Sector Skill Councils. Curriculum and courseware development including e-content, student
handbook, practical manuals, activity worksheets, etc. will be undertaken by the PSSCIVE,
National and State Education Boards and other reputed institutions having necessary
expertise and experience in development of curriculum and courseware, with greater inputs
from industry/ Sector Skills Councils in accordance with the National Occupation Standards
mapped to the needs of the industry. In order to provide broad overview of various sectors for
enhancing the competences of school students, PSSCIVE may develop courses suitable for
school system in collaboration with States/ SSCs and obtain necessary approval for their
NSQF compliance. The State/UT may also indicate the need of such courses to PSSCIVE
keeping in view their skill needs.
8.6.2 Teacher and trainer guides, practical manuals/workbooks, charts, multi- media
packages would also be made available to all the States/UTs for translation and
implementation. The State/UT Governments may translate the curriculum and courseware in
the language used as medium of instruction in their respective schools with the assistance of
SCERTs, School Boards etc.
8.6.3 The curriculum shall comprise modules on vocational skills and employability skills
including entrepreneurship skills. The employability skills modules will include
communication skills, self-management skills, ICT skills, entrepreneurial skills, and green
skills for enhancing the employability of the students. E-content on employability skills may
be developed and disseminated by PSSCIVE. A component of internship shall be an integral
part of the curriculum transaction. Students would be required to complete a minimum of 80
hours of workplace learning or on-the- job learning. Internship programme will help students
in developing personalized training plans, acquiring first hand information related to the
industry, exploring new and expanding opportunities in the labour market and developing
skills attuned to the needs of the labour market.
8.6.4 Lifelong learning skills shall be developed among students so as to enable them to
cope up with the rapid pace of economic and technological developments and at the same
time become lifelong learners.
8.6.5 E-Learning materials
8.6.5.1 The PSSCIVE and other Institutes/agencies having requisite experience and expertise
will develop e-learning materials for various vocational courses and would make them
available to the States/UTs. The State/UT Government shall provide necessary infrastructure
in schools for effective use of multimedia. Infrastructure and software, etc. established under
the ICT scheme may also be appropriately leveraged in running the vocational courses.
DRAFT DOCUMENT
142
Multimedia and e-learning materials suited to the needs of the learners, including children
with special needs may be developed.
8.7 FACULTY AND STAFF
8.7.1 The Principal or the Headmaster of the concerned school shall act as the Chief
Coordinator of the programme and will ensure seamless coordination and effective
implementation of vocational courses. At a cluster level, for schools opting for a common
trade, an industry coordinator can be engaged to assist the interface of schools with the local
industry for training; assessment, etc.
8.7.2 The Principal/Head Master in consultation with industry representatives shall arrange
for proper guidance and counselling of the students and sensitization of the parents. He/ She
shall oversee the working of the faculty/ resource persons/ skill trainers and ensure effective
linkages with the industry with the involvement of the District Education Officer, District
Industry Officer and the Industry Coordinator.
8.7.3 Vocational courses will be conducted with the help of Teachers/Skill trainers as well
as guest faculty on need basis. Schools shall be authorized to engage Teachers/Skill Trainers
with such qualification and experience as laid down by the PSSCIVE. The qualification for
the teachers/skill trainers will vary with reference to each cluster of vocational courses.
Accordingly, PSSCIVE will work out the details of qualification for engaging teachers/ skill
trainers and would circulate the guidelines for the selection and engagement of skill trainers
to all the States/UTs. The States will have to ensure that teachers/skill trainers are selected
well in advance before the commencement of the academic session. States/UTs may consider
engaging with Vocational Training Providers (VTPs)/Vocational trainers for a minimum
period of two years through appropriate Memorandum of Understanding (MoU) to ensure
stability.
8.7.4 The Teachers/Skill Trainers will impart knowledge of both the theory and practical in
their respective trades. The performance appraisal of Teachers/Skill trainers shall be
conducted at the end of each academic session and their further retention shall be linked to
delivery of quality output. Financial assistance will be linked to engagement of qualified
trainers/teachers.
8.7.5 Industry would be an important partner in providing master trainers as well as
resource persons for various vocational courses. The Principal in consultation with the
industry to which the school is linked can invite resource persons for the concerned
vocational courses within the specified norms and guidelines. In certain traditional skills and
occupations like handicrafts and handloom etc., the resource persons for providing training
for vocational courses can be obtained from amongst rural skilled/semi skilled persons in the
concerned vocation as per the guidelines.
8.7.6 Specialized practical work and training would be arranged in commercial and
industrial establishments, ITIs, Polytechnics, Community Colleges, hospitals, farms, etc.
DRAFT DOCUMENT
143
depending on the vocation and the nature and level of practical training required for the
course for which a funding provision has been made in the scheme. Training arrangements
may also be made in the unorganized sector on half or full day basis. Structural flexibilities in
the timetable should be made to arrange practical training according to the mutual
convenience of students and the trainer/industry. For the above purpose, MOUs shall be
signed between the school/institution and industries/user organizations. The Department of
Education in the States/UTs will ensure that necessary instructions are issued to concerned
officials to ensure full cooperation of industries, ITIs, Polytechnics, for imparting practical
training to vocational students.
8.7.7 Detailed guidelines for practical training in industry will be prepared by the
PSSCIVE, Bhopal. Wherever possible industry engagement may be converged with the
concessions and benefits being granted to the Industry by the Central and State Government
for their contribution in skill development e.g. tax benefits being given to the industries for
training individuals under the Income Tax Act, etc.
8.8 TRAINING OF TEACHERS
8.8.1 Appropriate quality assurance, verification and validation procedures would need to
be established for assuring the quality of the Vocational Teachers/Trainers. A Vocational
Teacher/Trainer should possess (i) Content knowledge, (ii) Pedagogical knowledge and (iii)
Pedagogical content knowledge. They should continuously strive for pursuing excellence
through better performance and professional development.
8.8.2 PSSCIVE, a constituent of NCERT will act as the principal coordinating agency for
organizing teacher training programmes. The training programmes may be reoriented to
develop the professional Vocational Teachers/ Trainers as per the NOSs. Sector Skill
Councils or Industry Associations will play a key role in supporting and improving the
quality of Vocational Teachers and Trainers through interventions at various levels.
8.8.3 Effective implementation of induction and in service training of Vocational Teachers
shall be imperative to bridge the current gap between demand and availability of qualified
teachers/skill trainers and to keep the teachers/skill trainers abreast with industry
requirements. An induction training of 10 days duration will also be organized by the
respective States/UTs for all the selected teachers/skill trainers. If felt necessary the induction
training can be staggered over two spells of training programme of 5 days each. Regular inservice training programmes of 5 days on pedagogy, subject content and other related aspects
of vocational education may be organized by the PSSCIVE and State Education Departments
for all teachers/skill trainers through established training institutes having necessary
experiences and expertise. While conducting the training programmes, all efforts may be
made by the States and UTs to involve the SCERTs and other Teacher Education Institutes to
leverage their capacities. States and UTs, may consult PSSCIVE and seek necessary
assistance, whenever required. The list of Vocational Teachers/Trainers trained through
DRAFT DOCUMENT
144
induction and in-service training may be uploaded on the website of the State Department of
School Education and PSSCIVE.
8.8.4 Training of Trainer programme for building a pool of resource persons for providing
state-of-the-art training to teachers/skill trainers would be developed by PSSCIVE in
consultation with NCTE and would be offered in institutions like PSSCIVE, Bhopal,
Regional Institute of Education of NCERT, Teacher Training Colleges, National Institutes of
Technical Teacher Training and Research, Universities, etc. for meeting the requirement of
teachers/skill trainers. Re tooling programmes will be developed for promotion of vocational
pedagogy and blended learning. PSSCIVE should organize training programmes for
developing Master Trainers for induction and in-service training. Training modules and econtent for this purpose may be developed which could also be disseminated to States/UTs.
8.8.5 Orientation/sensitization programmes/workshops may be organized for various
stakeholders including Central and State Boards of Education.
8.8.6 States/UTs may prepare a panel of vocational teachers/trainers with the help of
NSDC/SSC for each of the sectors. While appointing these trainers, they may be oriented on
educational pedagogy in order to enable them to understand the needs of the school system
and equip them for classroom transactions.
8.8.7 Induction Training
8.8.7.1 The induction training programme should be organised for newly recruited vocational
teachers by the State Implementing Agency in collaboration with PSSCIVE, Sector Skill
Councils, RIEs, SCERT and other stakeholders. Training in Industry should be facilitated by
the Sector Skill Councils (SSCs). The induction training programme should be conducted
before the commencement of the course in the school so that trainers are familiar with the
pedagogy, school environment and essential tenets of the programme beforehand.
8.8.7.2 The initial preparatory programmes for Vocational Teachers/Trainers may focus
largely on the vocational pedagogy and less on industrial or specialized skills. It may
comprise theoretical knowledge and practical competencies in the delivery of VET using the
theories and principles of pedagogy.
8.8.7.3 Training programmes on classroom management, managing resources (including
material and human resources), strategic planning, leadership techniques, production
methods, etc. may be regularly organized by PSSCIVE, RIEs of NCERT and SCERTs.
Reputed organizations having experience in this field may also be involved.
8.8.7.4 The vocational teachers engaged in the Senior Secondary schools offering vocational
courses under the erstwhile scheme of vocationalisation of secondary education may be
retrained to the new curriculum requirements and implementation strategies under the NSQF.
This would require intensive skill based training programmes in collaboration with the local
DRAFT DOCUMENT
145
Industry. The possibility of utilizing these vocational teachers as vocational coordinator may
also be explored.
8.8.8 In-service Training
8.8.8.1 Special training programmes on communication skills, vocational pedagogy, ICT
skills, Vocational guidance and counseling, etc. may be organized by the PSSCIVE, RIEs and
SCERTs to develop the competencies of Vocational Teachers.
8.8.8.2 Training of Vocational Teachers on the use of advanced technology (including ICT)
and innovative techniques may be regularly organized, especially to support training of
children with special needs.
8.8.8.3 Vocational teachers may be trained in utilizing e-learning materials, instructional
video-films and interactive computer aided programmes for supplementing teaching and
providing a wide variety of learning experiences to the learners.
8.8.8.4 Subject Specific training programmes may be organized by PSSCIVE, RIEs and
SCERTs with the help of industry experts for regular upgradation of competencies of inservice vocational teachers. Pre-test and Post-test needs to be made mandatory for all the
training programmes for improving the quality of training.
8.8.8.5 In order to increase training capacity, interactive training programmes utilizing
technology based systems like EDUSAT/SWAYAM may be encouraged. Self-learning
online programmes, including Massive Open Online Courses (MOOCs) may be developed
for the Vocational Teachers and students.
8.9 ENGAGEMENT WITH INDUSTRIES/ EMPLOYERS/USER
ORGANIZATIONS
8.9.1 The industry shall provide support in terms of providing resource persons, qualified
assessors, skill trainers and support for apprenticeship training. The Corporate Social
Responsibility Initiatives of the industries may also be leveraged where ever feasible. In all
such cases, funding for such components under the Scheme will be appropriately targeted to
avoid overlap.
8.10 CURRICULUM TRANSACTION
8.10.1 Learning by doing is the most important aspect in vocational education. Therefore, the
curriculum transaction should focus on activity based teaching-learning so that students learn
by doing. Students should be made accountable for both their academic and on-the-job
learning by providing continuous feedback through formative assessment and evaluation.
8.10.2 Field visit of students needs to be organized in industry, business and actual work
situations to enable them to understand and appreciate the real time work requirements and
make choices accordingly.
DRAFT DOCUMENT
146
8.10.3 Special classes on entrepreneurship may be conducted for those students who opt for
self-employment. Besides giving necessary guidance to the students for setting up their
ventures, the teachers/skill trainer may continue to provide technical support to them for the
transition period. Efforts may be made at appropriate levels to arrange soft loans and to
devise marketing strategies for these young skilled entrepreneurs.
8.10.4 The vocational subjects should be allotted atleast 2-3 continuous periods at a stretch
so that practical activities can be conducted seamlessly without any breaks.
8.11 ASSESSMENT AND CERTIFICATION
8.11.1 The competencies acquired at each level would be assessed and certified by the
Awarding Bodies i.e. the concerned National and State Education Boards to which the
schools are affiliated, with the involvement of Sector Skill Councils. If the SSCs are not in
place, industry associations /employers shall be associated. The results and the credits
received therein would be collated by the Awarding Body with the assessment and
certification of the theoretical component of the syllabi assessed in the educational institution
and the skill proficiency assessed in association with the industry/SSCs. The examination
shall include both written and oral elements for assessment of vocational knowledge and
practical tests for vocational skills. The certificate awarded should mention the competencies
and marks received in both theory and skills. The skills being duly assessed by SSCs/industry
should be recognized and accepted by industry and prospective employers.
8.11.2 Guidelines for competency based assessment and certification of students will be
provided by PSSCIVE, Bhopal, to be adapted by the concerned State Boards. While drawing
the assessment and certification framework, PSSCIVE will consult the industry/Sector Skills
Councils. The assessment and certification framework would provide for weightage of marks
for skill and theory components, minimum qualifying benchmarks, duration and design of
exams, modalities of internal and external assessment of theory and skills, qualification of
assessors, etc. Internal assessment of the performance of students will be done by the school
in a continuous comprehensive manner. The National or State Boards, as the case may be,
would conduct external competency based assessment of skills of the students in
collaboration with the concerned Sector Skill Council/industry/employer. The state /UT need
to adhere to the Assessment and Certification time lines. Local capacity for assessment may
be developed by working with state bodies (State Skill Development Mission).
8.11.3 The grades/marks obtained by the student in the vocational subject shall be
necessarily factored in the final mark sheet. External assessment with the involvement of SSC
may be taken up only at the end of Classes X and XII. The States/UTs need to follow the
assessment timeline. In Classes IX and XI, the practical assessment may be done by the
State/UT by interchanging the teachers/trainers amongst different schools for the purpose of
assessment.
8.11.4 In case a student is not able to clear academic subject(s) but clears the vocational
subject in class 10 and / or class 12 board exams, the student would be entitled to get a
competency based certificate of vocational subject from the Sector Skill Council, certifying
DRAFT DOCUMENT
147
the job role/level completed. This will help the student to continue to study the vocational
education course at an ITI or gain employment based on the skill certification.
8.12 STUDENT SUPPORT SYSTEMS
8.12.1 A student support system will be crucial for the success of the vocational education
programme.
8.12.2 Vertical Mobility
8.12.2.1 The vertical progression in vocational education would need to be strengthened so
that the vocational pass out students of schools can gain entry into vocational courses offered
by Polytechnics, Industrial Training Institutes and higher education, including Bachelor of
Vocational Education (B. Voc).
8.12.2.2 The School Education Department in coordination with the Department of Higher
and Technical Education of the State/UT may create more avenues for vertical mobility like
introducing B. Voc courses in universities. They may assist and facilitate the students in
pursuing higher education in vocational subjects. School vocational education qualifications
should be recognized by higher education institutions at par with academic qualifications for
admission to diploma and degree courses.
8.12.3 Career Information and Guidance
8.12.3.1 Vocational guidance, which is a process of assisting an individual to select an
occupation, prepare for it, enter upon and progress in it, will be critical in ensuring requisite
enrolment of students in various vocational courses and for assisting the students in making
an informed choice of vocational courses. Specific counselling drives should be organized in
the school involving suitable experts. It shall be the responsibility of the Principal of the
school to invite / involve the Counsellors / resource persons/experts from the industry from
time to time for providing necessary guidance to students and parents regarding market trends
and suitable vocational choices. The Counselor would also inform students about the various
job opportunities, possibilities of vertical and horizontal mobility and also opportunities for
self-employment.
Few states have taken initiative for vertical mobility like:
• Haryana has made provision for direct admission of school vocational
education students to 2nd year of the diploma courses.
• Maharashtra has provided 25% reservation for Class 10th vocational passouts in ITIs and 15% reservation in Polytechnics.
• Himachal Pradesh provides 10 % extra weightage to class 12 vocational
pass outs for admission in the B.Voc courses being run in the state.
DRAFT DOCUMENT
148
8.12.3.2 A review of recruitment rules and procedure are a pre-requisite. Central and
State Governments and employers, including private, will need to amend the recruitment
policies, rules and procedures for giving preference to persons with competencies compliant
with the NSQF.
8.12.4 Organization of Career Melas
8.12.4.1The placement of students passing out with vocational subjects will be an important
parameter for measuring the outcome and impact of the scheme. As an important stakeholder
of the Scheme, the industry/ employers in the area, in close association with schools may
endeavor to conduct /organize career/job fairs, campus interviews, recruitment drives, etc. for
suitable placement of students. The services of the industry co coordinators can be utilized
for this purpose.
8.12.5 Apprenticeship Training
8.12.5.1 The Apprentices Act 1961 was enacted with the objective of regulating the
programme of training of apprentices in the industry by utilizing the facilities available
therein for imparting on-the-job training.
8.12.5.2 The apprenticeship training scheme is being implemented through the four
Regional Boards of Apprenticeship Training (BOAT) at Mumbai, Kolkata, Chennai and
Kanpur. The State Education Department, and District Education Office, State Skill
Development Mission (SSDM) and Vocational Training Providers (VTP) may liaise with the
BOATS for apprenticeship training of the students.
8.12.5.3 As per law, only persons above the age of 18 can be given a full time job and most
students in schools who follow a vocational education course and who need a job, are not
eligible. The MoU between the State/UT and the VTP should include a provision so that the
VTP undertakes to provide apprenticeship to at least 70% of the interested students, who are
below the age of 18, and thereafter a job. The undertaking should further provide for giving
job to at least 70% of the interested students who are 18 years and above of age.
8.12.5.4 Effective implementation of the provisions of the Apprenticeship Act can be
ensured through (i) Coverage of additional vocational courses under the Apprentices Act, (ii)
More effective arrangements for accommodating vocational pass outs in the industry and
organisations, and (iii) Effective coordination between the various stakeholders.
8.13 GIRLS’ PARTICIPATION
8.13.1 Special guidance and counselling session may be organized for girls as per need. The
Principal of the school should take necessary steps to remove gender bias, if any, in the minds
of employers /financiers against giving the girls employment or loans. The implementation
aspects in favour of girls mentioned in other appropriate sections of the scheme would be
ensured. All the reporting, data generation shall be in gender segregated manner.
DRAFT DOCUMENT
149
8.14 COVERAGE OF SPECIAL FOCUS GROUPS
8.14.1 Efforts will be made by the States/UTs to mainstream children belonging to special
focus groups i.e. SC, ST, OBC, minority, persons below poverty line and children with
special needs, with special attention to the girls belonging to these groups. Special priority
would be given for introduction of vocational education in schools in identified SC, ST and
minority concentrated districts/ blocks. States/UTs will encourage and ensure the
participation of students belonging to the special focus groups in vocational education
through suitable measures. Enrolment drives, provision of special facilities, working in close
collaboration with parents and community based organization etc. may be undertaken to
ensure participation of special groups in vocational education. Monitoring attendance,
organizing remedial classes and follow up of special groups will be done by the concerned
schools.
8.14.2 Arrangements will also be made in schools for removing architectural barriers for
providing easy access to learners with special needs. The curriculum and teaching
methodologies must recognize and address the needs of all learners with special needs. For
giving due care and attention to such students, necessary orientation and sensitization of
teacher/skill trainer preparation will be ensured. While selecting the vocational courses, the
diverse needs of the learners with special needs will also be factored in.
8.15 PROGRAMME MONITORING AND EVALUATION
8.15.1 Monitoring and Evaluation will be a built-in feature of the programme. Monitoring of
programme implementation will be done at various levels, viz., National, State, District,
Block and Institutional level. The feedback mechanism would ensure identification of
deficiencies in instructions, administration, financial management, etc., so that the
functionaries at each level are able to take timely decisions to fill in the gaps in policymaking, direction, budgeting, etc.
8.15.2 The data on vocational education is being captured through UDISE and SDMIS. It is
the responsibility of State officials to ensure that the data related to vocational education is
filled in by the concerned schools. The Online Monitoring mechanism through Project
Management System (PMS) has been developed. The data on coverage, performance,
placement may be regularly updated by states on the PMS portal. The Principal/ Headmasters
may be made responsible for updating the data. SMC/ SMDCs, local bodies including PRIs
may be closely involved in the monitoring of the Scheme. An Online app for monitoring and
tracking, sharing stories and raising issues may be developed.
8.16 COORDINATION AND CONVERGENCE
8.16.1 Active coordination and convergence of all efforts of the Central and State
governments towards skill building is essential for ensuring efficiency, effectiveness and
DRAFT DOCUMENT
150
economy in delivery of outputs and outcomes. While implementing the scheme, the State and
the UTs shall make all necessary efforts to secure convergence with ongoing Central/State
government schemes. Inter-departmental Committee in close coordination with the State Skill
Development Mission may be set up at the State level to guide and monitor the
implementation of the Scheme.

8.16.2 Necessary efforts shall be made to utilize the existing infrastructure (classrooms
workshops, labs, etc), resource persons, etc. available in schools and ITIs, Polytechnics,
Community Colleges and Skill Development Centers for implementation of the scheme.
Curriculum and courseware already prepared under skill development Schemes being
implemented by various Departments and Ministries of Government of India and State
Governments may be leveraged. Convergence may also be explored with ongoing schemes,
skill initiatives, financial benefits, incentives, scholarships etc on skill development funded
by National and State Governments through various Ministries, Departments, Institutions,
Agencies etc.
8.17 INTRODUCTION OF VOCATIONALISATION OF SCHOOL EDUCATION
FROM CLASSES VI TO VIII
8.17.1 Introduction of vocationalisation of school education from Classes 6 to 8 will help in
connecting skill based activities with general academic subjects, like science, language, social
science, etc. It will be useful in providing opportunities to the children to explore the basic
skill requirements for the various productive tasks in the world of work. The underlying idea
behind such work based activities is to make them as an integral part of the teaching -learning
process rather than as an add-on to the existing scheme of studies of education from Classes 6
to 8. It will not only reduce the boundaries between the bookish knowledge and application of
knowledge but will also expose children to the skill requirements in the work areas, thus
helping them to decide the future career path. These multi-skill activities, inter alia, would
also foster the development of soft skills, such as aesthetic values, cooperation, team work,
judicious use of raw materials, creativity, quality consciousness, etc. Students shall also visit
organizations and people engaged in different occupations for insightful knowledge and skills
related to potential areas of future employment.
8.17.2 All the schools would introduce vocationalisation of education from Classes 6 to 8.
The vocational modules on soft and hard skills will help children to explore the essential
aspects of the world of work and prepare them for choosing a vocational subject or a career
options. Through the soft skills, children will develop dispositions, attitude and social
competencies to become functional at personal and social level. The soft skills modules will
develop communication skills and ICT skills. For vocational skills components, activities
based on the themes given in the syllabus for the general education subjects can be organized.
8.17.3 The general education teachers of languages, mathematics, science, social science, art,
music, and work experience would be involved in the organisation of the skill-based activities
related to the themes that they are teaching. The curriculum load and the time table will have
DRAFT DOCUMENT
151
to rationalized to provide enough time to the children to participate actively in the activities.
The teaching-learning methodology may be based on observation, manipulation and practice.
Concerned subject teachers may be trained in the use of teaching techniques that support
activity based learning, including hands-on learning, problem solving, cooperative or teambased projects, lessons requiring multiple forms of expressions, project work that draws on
knowledge and skills from several domains. Students may also visit organizations and people
engaged in different occupations for insightful knowledge and skills related to potential areas
of future employment.
DRAFT DOCUMENT
152
CHAPTER 9 – PRE-SCHOOL EDUCATION
The Integrated Scheme for School Education envisages the ‘school’ as a continuum from PreSchool to Senior Secondary levels. These would cover preschools referred to by all
nomenclatures such as Anganwadi, Balwadi, nursery, preschool, preparatory, pre-school,
LKG, UKG, play centres, crèches, Bal Vatikas etc.
9.1 Section 11 of the RTE Act, 2009 states that “with a view to prepare children above
the age of three years for elementary education and to provide early childhood care and
education for all children until they complete the age of six years, the appropriate government
may make necessary arrangements for pre-school education for such children.”
9.2 Research and experience have repeatedly demonstrated that Early Childhood
Development and Education not only increases the progress and achievement of children in
primary schools and lay the foundation for future growth, learning and development, but also
develop positive attitudes and the desire to learn. Therefore, it becomes imperative to provide
quality pre-school experiences to children.
9.3 The preschool programme may be of upto 2 years duration that is for children of the
age group 4-6 years.
9.4 States and UTs have been asked to examine the possibility of shifting the Anganwadi
Centres (AWCs) to the campus of the nearby primary schools located in the habitation of
AWCs catchment with a view to improve child preparedness for going to school and to
ensure smooth transition from preschool to formal schooling. States and UTs have taken
steps to locate the ICDS centers within the school complex (wherever feasible) to ensure
smooth transition of children from Pre-school in the Anganwadi Centre to the formal
school. Nationally, 41.3 percent of government primary schools have a co-located
Anganwadi Centre (UDISE-2015-16). It is important to emphasize that co- location of
Anganwadis run under ICDS programme should lead to greater convergence with the
school. The school and the Anganwadi should work as part of each other so that colocation of anganwadies in schools does not only remain physical co location. The
Principal of the Primary School should look after and help to develop the educational
component of the anganwadi centre. S/he should ensure that the teachers of Primary
school and the anganwadi workers work in a collaborative manner. The child centered
pedagogies should also be extended to early grades i.e. classes 1 and 2. District
education officers (DEO) and Child Development Project officers (CDPO) will organize
joint meetings of the Principals/headmaster and anganwadi workers/supervisors and
work out strategies to bring about convergence at the local level.
DRAFT DOCUMENT
153
9.5 Wherever the State Government is desirous of providing pre-school education in the
formal primary school, the scheme will provide support to enable the co-located Anganwadi
centre to enrich and sustain its preschool and school preparedness component. Support may
also be given for providing pre-school education in uncovered areas.
9.6 Pre-School Campus: The physical environment of the school campus aligned to the
primary/elementary school will be such that children feel safe, secure, comfortable and at
ease and can enjoy exploring and learning. The teachers and helpers and other support staff
should be well trained to supervise and look after the young children. There must be adequate
staff to maintain hygiene, sanitation, ensures safety, security of children in the school.
9.7 Sanitary Facilities: The preschool will be equipped with basic sanitation facilities
such as healthy, safe and nutritious meals, safe drinking water facility, and cleanliness in and
around the school. Toilets in the schools must have appropriate accessories and adaptations
for children with special needs.
• Separate toilets for boys and girls, suitable for small children.
• Toilets should be safe and have regular water supply.
• Soap/hand wash and clean towel should be made available.
• Bathroom fixtures and sinks may be provided at the level children can reach easily.
• Garbage bin with a lid should be provided in each class and in outdoor area.
9.8 Safety Precautions: Keeping in view that the young children have recently learnt
some motor skills like running; some additional safety precautions will have to be observed:
• The classroom should have adequate space for movement; the play space should
ensure safety of children i.e. prevent children from running out and getting hurt
from grievous injury.
The NPE gives importance to Early Childhood Care and Education (ECCE) as a
crucial input for human resource development, as a feeder and support programme
for primary education and as a support service for working women of the
disadvantaged sections of society. It has also taken into account the holistic nature of
ECCE and has pointed out the need for early care and stimulation of children
belonging to the vulnerable sector. The potential of ECCE is recognised as an
intervention for lifelong education. It is widely acknowledged as an essential input
for girls’ education in freeing girls from sibling care responsibilities, leading to their
regular attendance in school and in providing school readiness skills to pre-school
children. With the RTE in place the preschool segment of education has become all
the more important.
DRAFT DOCUMENT
154
• The furniture and toys need to be child –friendly and free from any sharp edges.
• Doors should be light in weight and should not be of self locking or swinging type.
• There should be mesh in all the windows to prevent mosquitoes coming in.
• No toxic paint should be used for play material/ equipment. The equipment should
not have any sharp corners, jutting nails etc. and should be sturdy.
• Play material should not have any loose parts which children may swallow by
mistake.
• Maintenance of outdoor equipment should be regularly attended to, in order to
protect children from injury.
• Electric outlets which are accessible to the children must have protective caps
when outlets are not in use.
• Any arrangement made by the school for transporting children should be safe,
comfortable and convenient.
• Items of potential danger or cleaners like: flammable liquids, toxic material, soaps
and detergent etc. must be kept in original container with original label. These
should be stored in an area not in use by the children and is away from the kitchen.
• During cleaning, daily inspection of indoor and outdoor area must be done to
search for sharp objects (needle, pins, branches), poisonous foliage and
mushrooms, bee or wasp nest and depth of area under swings.
• In a pre-school, it essential to provide some time for rest/ nap during the day’s
program. A clean mattress with sheet along with a comfortable pillow may be
provided for this purpose.
• Every centre must have clearly written procedure to be followed in the event of
emergency. Further emergency numbers (ambulance, fire safety, Police, doctor)
should be kept handy.
 EARLY CHILDHOOD EDUCATION of SIKKIM
Pre-primary education is an integral part of school education system in Sikkim. The PrePrimary Education is provided by both the government departments like Human Resource
Development Department, Social Justice, Empowerment and Welfare Department.
Pre-Primary Education managed by the Social Justice, Empowerment and Welfare
Department
The Women and Child Division of Social Justice, Empowerment and Welfare Department,
Government of Sikkim provides Early Childhood Education through ICDS centres. These
centres provide both care and education to pre-school children. However, the education
imparted by these centres was not considered as formal education i.e. qualifying for the
admission in class I (first grade) in the Government Schools.
Pre-Primary Education managed by the Human Resource Development Department
The Human Resource Development Department is the largest agency catering to pre-primary
education in the State. The pre-primary education is provided in the formal school and is
under direct control of the Human Resource Development Department, which is a unique
DRAFT DOCUMENT
155
feature in the school education system in Sikkim. All the government schools are provided
with pre-primary teachers who were called school mothers prior to 2013. There was the
system of enrolling children when they attain 5 years of age and they enter into class I at the
age of 6 years after passing one year Pre-primary Class. However, after the enactment of RTE
Act 2009 in the State in 2010, the State started giving admission to the children in age specific
classes.
In 2015, the State government decided to introduce two years of Kindergarten system i.e.
LKG and UKG in all government schools vide Notification No. 74/DIR/HRDD/PE dated
24/12/2015. The age of admission in LKG is 4 years and UKG is 5 years. As decided, the
State identified 31 schools to initiate the project as pilot for 2016.
• Supply of uniform different from other classes of government schools
• Supply of TLMs (Picture reading books, games material, flash cards, zigzag puzzle,
worksheets and other teaching aids to develop early reading and arithmetical skills,
play corners, reading corners, etc.
• The curriculum of kindergarten has been framed by the State as per NCERT
guidelines
• Two series called “Get Set Go” have been developed for development of early
language skills and early arithmetical skills, writing letters and numbers, fine motor
skills, etc.
• Games and activities have been developed to develop socio-emotional skills
• Pre-primary teachers of pilot schools have been trained on pedagogical approaches to
be adopted in the kindergarten
After its one year of implementation, many parents have withdrawn their children from
private school and sought admission in government schools.
9.9 Facilities for CWSN: To accommodate children with special needs following
facilities have to be ensured:
• Construction of ramps with rails and stationary bridges. These will facilitate such
children approach the indoor and outdoor area and access play equipments.
• Equipments, play learning material, furniture and other facilities have to be
suitable and easily available for children with disabilities.
• Toilets should have appropriate accessories and adaptations for children with
special needs.
9.10 Child Abuse and Rights: Special care will have to be taken that there is no child
abuse:
• No physical, verbal or emotional abuse.
• No harsh discipline and No corporal punishment.
• Children should not be neglected.
• All boys and girls to be treated equally
• All teachers must be trained to identify, understand and respond appropriately in
case they observe any signs of child abuse /neglect.
DRAFT DOCUMENT
156
• Teachers should be trained in promotion of tolerance and unity and respect for
diversity in line with the quality standards.
• All teachers to be trained in accommodating CWSN children with compassion.
9.11 Location of Pre-school:
Pre–school being co-located on the campus of primary or elementary school should be
easily accessible to the children. Transportation facilities available in the area may also be
utilised in case the distance is more than 1 KM. Following are the points for the location of
the school
• Away from heavy traffic, ponds, well, ditches, nallahs, pollution, heaps of
garbage, cattle shed/animal shelter, slush, stagnant water and uncovered drains.
• The building must be surrounded with boundary wall or a fence to mark the safe
area.
• The pre-school may be located on the ground floor.
9.12 Curriculum: Based on the understanding of insights and philosophies of different
practitioners and thinkers, the following basic principles of curriculum are visualised:
• Play as the basis for learning
• Art as the basis for education
• Blend of the textual (basic literacy and numeracy) and the cultural
• Mix of formal and informal interaction
• Experience of both familiarity and challenge in everyday routines
• Primacy of experience rather than expertise
• Developmentally appropriate practice and flexibility
• Use of local materials, arts, and knowledge
• Integration of health and well-being based on healthy habits.
9.13 Duration of Pre-school
• The duration of the school timings will be 4 hours. However, when children have
to be accompanied by older sibling/children of the primary school the timings of
the pre-school section should coincide with the timings of the primary classes.
• The program should provide for some rest period during the day. A program
which is of longer durations should provide facilities for nap time also.
• The teacher should come 15 minutes earlier than the children and leave 30-45
minutes after them so that s/he can make preparations for the next day.
9.14 Learning Activities: The learning centres/learning corners will be created in the
classrooms so that children get opportunities to engage in free play and the teacher is
able to handle multi age groups for providing age appropriate activities thereby
ensuring safety of children.
• The library and literacy area: This area should have a variety of age appropriate
children’s magazines, information books, picture books, story books, big books,
local folk tales, thematic books and comics.
DRAFT DOCUMENT
157
• Doll’s area/ dramatic play corner: The materials here can include: various kinds
of dolls, doll-sized furniture and clothes, doll-sized cooking utensils (pots, dishes,
spoons etc), pretend food (vegetables or fruits made of clay), dress- up clothes
(scarf, cap, stole, jacket, small sari, long pieces of cloth etc.), combs and a mirror.
• Discovery/ science area: It should be equipped with materials like: ramps and
wheels, magnifying glass, shells, plants, seeds, weighing scales and weights,
measuring tapes, or any other locally available materials.
• Block building/ manipulative area: This area should have blocks of different
colours, shapes and sizes; puzzles; matching cards; lacing strings/lacing cards;
threading strings and beads; small toys such as cars, trucks, animals, people
figures; and other objects from the environment.
• Art Area/ creative corner: The material in this area should include different
types of papers, crayons, pencils, washable markers, slates, different coloured
chalks, pieces of fabric, paints, brushes, tape, play dough/clay, rolling pins and
boards, old newspaper and magazines for collage and ice-cream sticks.
• Music area: The music area may be equipped with a dhapali, bell, bowls, flutes,
tambourines, string instruments, other local musical instruments, tape recorder and
a variety of DVDs of songs and rhymes. This corner may have material such as
ribbons or scarves for the children to use to promote creative movement.
9.15 Content, Pedagogy, Practices and Assessment: The pre-school program will be
holistic in nature. It has to be child centered, developmentally appropriate and process
oriented. Play-based early learning activities have to be planned in ways that would expose
children to a variety of experiences. The content of the program will include activities for
• Physical Well-Being, Health, and Motor Development
• Personal, Social and Emotional Development
• Creative, and Aesthetic Development
• Language, Communication and Literacy Skills
• Environmental Awareness, Development of Scientific Temper and developing
Mathematical thinking and Reasoning.
• A record of the children's progress should be maintained. Assessment of children
should be continuous and comprehensive. There should not be any formal tests or
end term exams for children in Preschools.
9.16 Well being of the Children: The Pre-school program will provide for:
• Regular medical check-up of children and provide follow-up and referral services
wherever necessary
• Growth monitoring through maintenance of height and weight records through
monthly/bi-monthly records.
• Snack time; daily provision of supplementary nutrition in accordance with the
nutritional status of children
DRAFT DOCUMENT
158
9.17 Outdoor activities
• Commercially available or improvised equipments for providing experiences like
climbing, jumping, balancing, swinging, swaying, cycling etc. will be provided.
• Large and small balls, old tyres and rings etc. will be provided for throwing
rolling, catching and kicking experiences.
• Sandpit/sandbox, trays, plastic strainer, sievers, containers, plastic mugs, katoris
etc. will be provided.
• A big tub, bucket, mugs and cups of different sizes, sieves and floating toys for
water play will be provided
• Various outdoor games may be organised for children even without any
equipment. It is important to provide experiences for both gross and fine motor
development
• In schools where there is no provision for a playground for outdoor activities the
teacher should plan for activities for gross motor development within the
classroom.
9.18 Age for Admission: A child is ready to enter in an organized Pre-school program on
completion of 4 years of age at the beginning of the session/academic year, when, s/he is able
to tackle separation anxiety from family; has developed some verbal competence and can
communicate basic needs and has become toilet trained.
9.19 Professional Development of Teachers: The professional preparation of teachers
calls for thoughtful planning of training sequences relevant to the developmental needs of
early childhood. Continuous training of teachers of the Pre-school program will be carried out
by regular refresher courses, workshops, visit to other schools; self-evaluation techniques etc.
for the teachers and helpers so that they can update their knowledge and enhance their
efficiency.
9.20 Community Awareness and Partnership: There has to be partnership with parents,
families and the community wherein children’s interest and choices are taken care of.
• Teachers will involve parents/ guardian of children in the activities of the preschool so that they are able to replicate the same or similar activities at home.
• S/he will involve them in the development of Teaching Learning Material (TLM)
like toys, puppets, story chart, story box, flash cards, doll’s and masks etc.
• Parents or guardians will also be involved in the preparation of food items and
serving meal.
• Parents will be involved in organising cultural activities, field trips, excursions
and visit to the fair etc.
• Parents or guardians will be continuously counselled regarding behavior problems
of children.
DRAFT DOCUMENT
159
9.21 Action points for States and UTs
• States may like to consider including/co-locating one or two years of pre-school
education in primary/elementary school and implement a developmentally
appropriate curriculum and focus on school readiness for children.
• There will be need for teachers specially trained in child development/Early
childhood development for the pre-school classes for which the States will need to
make provision for training and capacity building, etc.
• Various Universities are offering Early Childhood Education courses under
Vocational Programmes. Indira Gandhi National Open University (IGNOU) offers
one year diploma in Early Childhood Education. Home Science Colleges of
various Universities are offering Diploma courses on ECCE. Many state SCERTs
like Nagaland, Delhi are also offering Diploma courses in Preschool Education.
The states will develop mechanisms for providing preschool training to a large
number of candidates.
• States will need to develop appropriate curriculum and teaching learning material
for preschool education. The curriculum must have a linkage to the curriculum for
classes in primary level of schooling.
9.22 Coordination and Convergence: Effective implementation of Pre-school program
requires coordination and convergence among different departments, and sections within
departments, dealing with different components of health, care and early education.
a. Convergence with MoWCD: The Scheme emphasizes the strengthening of
convergence with the ICDS programme of Ministry of Women & Child
Development to promote pre-school education. The department would strive to
achieve effective synergy with the ICDS through the following:
i. Instructions to be issued by State Education Departments in concurrence
with ICDS Department.
ii. Regular inter departmental meetings to be held at the State, district and
block level between School Education officials and the ICDS programme
and coming out with action points to bring about convergence at the ground.
iii. Making the Principal/headmaster of Primary School responsible for
education component of anganwadis. Designating one of the existing
primary school teachers as incharge of Preschool to plan convergence with
the co-located anganwadi centre.
iv. Representative of ICDS programme will be on the State Level Executive
Committee of school education and District Implementation Committee.
v. Location of Anganwadi centers in or close proximity to primary school
campus and synchronization of the timings of the Anganwadi centers with
the primary schools.
vi. Joint efforts for curriculum renewal of Pre-school teacher training and
conduct of trainings of Anganwadi workers, primary teachers and health
workers for a convergent understanding of links between learning and
development in pre-school and primary school.
DRAFT DOCUMENT
160
vii. Use of infrastructure of DIETs, BRCs and CRCs for training of Anganwadi
workers and other functionaries of ICDS.
viii. Strengthening of training of Anganwadi workers in pre-school activities in
both existing and new projects/Anganwadi centers.
ix. Training Primary School teachers in the pedagogy of Early Childhood
Education.
x. Augmentation of pre-school kits/ materials in Anganwadis, where such
materials are required.
DRAFT DOCUMENT
161
CHAPTER 10 – PROGRAMME MANAGEMENT
10.1 Programme Management Approach
10.1.1 Every state in the country has its own administrative structure for management of
school education. Although variations in the institutional arrangements, including
administrative structure at various spatial levels, for management of school education exist
across states, these are not organized in a fashion, which would facilitate administration of
school education as a Pre School to class XII system. The institutional arrangements at state,
district and sub-district levels are mostly segmented with little convergence of interventions
and coordination between various administrative structures managing elementary, secondary,
vocational and teacher education. One of the distinct features of the administration of the
school education system across the states is the absence of any administrative or support
structure at the sub-district level for management of secondary education. However, over the
years, with the implementation of the centrally sponsored programmes like the SSA, RMSA,
Teacher Education, parallel institutional arrangements for management of these programmes
have been created at the sub-national levels. These parallel management structures are also
encountering similar management issues found in the mainstream administration system for
school education. Lack of coordination, convergence of interventions, vision to consider
school education as a continuum, to name a few, continues as major management issues
encountered by these parallel institutional arrangements.
10.1.2 The decision to subsume the different centrally sponsored schemes into an integrated
school education scheme provides the opportunity to rationalize the institutional
arrangements at all levels and adopt a holistic approach for administration of school
education. As the scheme is outcome oriented, ‘school effectiveness’ occupies the centre
stage of its management framework. Not only that the management framework of the
integrated scheme envisages rationalization of its administrative structure at the national and
sub-national levels, it has gone for a major shift in its approach to monitoring implementation
of the scheme. While the Project Management System (PMS) would focus on monitoring the
inputs (i.e. progress against physical targets) and processes of implementation of various
interventions of the Integrated Scheme, specific management functions would be carried out
by specific administrative structures at national and sub-national levels. Managing
performance of school education rather than just monitoring the physical and financial targets
is the primary focus of the management framework of the Integrated Scheme.
10.1.3 In order to make the Integrated Scheme for School Education outcome oriented, a
comprehensive Result Framework Document (RFD) has been designed. It has two parts
containing Key Performance Indicators (KPIs) to monitor: (a) programme level outcomes and
intermediate results of the elementary level of education, which is covered under the RTE
Act 2009; and (b) programme level outcomes and intermediate results at secondary and
Senior Secondary levels. The Results Framework Documents for monitoring progress at
elementary and secondary level of education have been given at Annexure-VII and VIII. It
is envisaged to use these RFDs as planning, monitoring and communication tools at national,
DRAFT DOCUMENT
162
state and district levels. The actual progress against the cumulative annual targets/results in
the RFDs would serve as the basis for assessing the performance of the scheme as well as that
of the states in delivering desired results. While developing the national as well as state
specific RFDs, the status of the school education in 2016/17 would be taken as the
benchmark.
10.1.4 The launch of Samagra Shiksha has created an opportunity to reorganize the existing
systems of administration of earlier programmes like the SSA, RMSA and TE to adequately
respond to the demands of the entire school education system. Strengthening of management
structures at the national, state, district, block, cluster and school levels would be a
prerequisite for timely and efficient implementation of the programme. The project
management structure and requirements of manpower, delegation of authority and capacity
building, therefore, assume considerable importance, given the expanded activities of the
Scheme. The administrative structure and the monitoring framework of the Scheme aim at
promoting decentralized management of school education with focus on creating school
networks at block level as a move towards creating Professional Learning Communities
(PLCs) and deepening school level management practices.
10.1.5 Given the shift in the approach to the management of the Integrated Scheme on
School Education, the management structures at national, state and district levels and the
related roles and responsibilities have been described in Section II. Section III discusses the
monitoring framework and roles and responsibilities of administrative structures at various
levels in monitoring implementation and outcomes of the Integrated Scheme.
10.2 Programme Management Structure
10.2.1 The SSA and the RMSA, have created parallel systems of programme management
structures at all levels, down to the school level. With implementation of the Integrated
Scheme, it is envisaged to reorganize the existing management structures of the SSA and the
RMSA into a single management structure. The existing personnel currently employed at
different levels would be pooled together, and wherever necessary, additional manpower
would be deployed to facilitate effective management of the Scheme at national and subnational levels. Currently, many States have two separate Societies for Implementation of
SSA and RMSA. The Integrated Scheme would be implemented through a single
Implementation Society, which would help utilize the available manpower and resources
more effectively. This would lead to better implementation of the provisions under the
Scheme and achieve the targets and expected programme results within a unified framework
and administrative mechanism.

DRAFT DOCUMENT
163
Figure 1: Management structure at the national level
ECCE : Early Childhood Care Education
FM : Financial Management
IE : Inclusive Education
PMS : Project Monitoring System
RTE : Right to Education
TE : Teacher Education
VE : Vocational Education
NCERT : National Council of Education Research and Training
NIEPA : National Institute of Educational Planning and Administration
NCTE : National Council for Teacher Education
NCPCR : National Commission for Protect of Children Rights
SE&L : School Education and Literacy
Governing Council
Project Approval
Board
Department of
SE&L
Technical Support
Group
NITI Aayog
and Related
Ministries
NCERT
NIEPA
NCTE
NCPCR
Assessmen
t
Civil Community
Mobilization
Equity ECCE FM &
Procurement
Gender IE
Media PMS Access
Planning &
Appraisal
Quality RTE Research,
Evaluation &
Documentati
on
MIS TE Legal VE
DRAFT DOCUMENT
164
10.2.2 As far as the management structure of Integrated Scheme is concerned, the central
focus of the framework is to adopt those management practices that facilitate clear
specification of development objectives and results; evidence-based decentralized planning at
district level adopting a whole school approach; participation at grassroots level;
strengthening both vertical and horizontal accountability; and creation of opportunity for peer
learning by establishing school complexes/networks/PLCs.
10.3 National Level Administrative Structure:
The programme will be implemented in the mission mode. The mainstream structures
will primarily be used for implementing the programme. The Department of School
Education and Literacy, Ministry of Human Resource Development will be the implementing
agency at the national level. The Management Structure at the National Level is given in
Figure 1 along with the broad Roles and Responsibilities in Table 1.
Table 1: Roles and responsibilities of the national level bodies and administrative
structures
Administrative Structure Administrative Head Role and responsibility
Governing Council Minister HRD To provide policy direction and facilitate
centre - state coordination.
Project Approval Board Secretary SE&L Full financial powers to approve plans and
sanction budget and implement the
programme.
Bureau of School
Education
Additional
Secretary/Joint
Secretary
Appraise, evaluate, finance, and supervise
national, state and district level planned
interventions.
NCERT Director Provide necessary technical and academic
support
NIEPA Vice Chancellor Provide technical and professional support,
with focus on capacity building for
promoting decentralised strategic planning
at district and institutional levels;
leadership development; effective
monitoring and evaluation of programme
outcomes, including school evaluation
NCTE Chairman To provide technical and academic support
for planning and management of teacher
education component
TSG/MHRD Joint Secretary
(SE&L)
To provide support to the Bureau in
providing technical assistance to the
Integrated Scheme for School Education
10.3.1 ROLES AND RESPONSIBILITIES OF THE GOVERNING COUNCIL
More specifically, the Governing Council would:
(i) Be empowered to modify financial and pragmatic norms and approve the
detailed guidelines for implementation within the overall Framework of the
DRAFT DOCUMENT
165
Scheme. Such modifications will include innovations and interventions to
improve the quality of school education;
(ii) Review the implementation progress of the Scheme in various States;
(iii) Give overall policy guidance and direction for better implementation;
(iv) Suggest measures for convergence between other programmes and schemes of
other Departments/Ministries that impact children’s education;
(v) Help strengthen Centre-State partnership in implementation of the scheme;
(vi) Help strengthen the involvement of elected political leadership, voluntary
agencies and the private sector for achieving the objective of the scheme.
10.3.2 POWERS AND FUNCTIONS OF THE PROJECT APPROVAL BOARD
A Project Approval Board will be constituted at the National Level under the
Chairmanship of Secretary (SE&L) with the following functions-:
(i) Discuss and approve the Annual Work Plan and Budget of the States / UTs;
(ii) Provide administrative clarifications and instructions regarding RTE norms
and implementation procedures;
(iii) Discuss, formulate and recommend changes in programmatic norms, and
implementation to the Governing Council;
(iv) Review the implementation of Scheme through half-yearly meetings with
Education Secretaries/State Project Directors of each State/UT and /or other
mechanisms;
10.3.3 Role of Technical Support Group (TSG) of the MHRD
The TSG in EDCIL is created to provide technical support in the various functional
areas under the Integrated Scheme from national level to State and district level. TSG is
staffed by Senior Technical and Professional Experts to manage various functional areas,
supplemented, as needed by consultants, and support staff. It also supports capacity building
at State/District level of various functionaries in the functional areas mentioned in Table 2:
Table 2: Role and responsibilities of the TSG of the MHRD
Functional Area Responsibility
Access, Planning & Appraisal Opening of New Schools, Special Training to OoSC,
Seasonal Hostel, Residential Hostel for Urban-Deprived
Children, Admission under 12(1)(c)All works related to
AWP&B, Joint Review Mission,
Finance & Procurement Budget of the Integrated scheme, BE/RE, Demand for
grants, Supplementary grants, External funding, Audit,
PFMS
MIS & ICT U-DISE& SDMIS, Educational Indicators and other EMIS
data, CAL & ICT, Digital initiative under the integrated
scheme
Project Monitoring System (PMS) All data and information related to project monitoring,
Financial Monitoring, QPR, Direct Benefit Transfer under
DRAFT DOCUMENT
166
Functional Area Responsibility
integrated scheme and Swachh Vidyalaya
Quality (Pedagogy) Curriculum, Pedagogy, CCE, Padhe Bharat Badhe Bharat,
Rashtriya Aviskar Abhiyan, School Leadership, Academic
support through BRC & CRC
Assessment Learning outcomes & Assessment, National Achievement
Survey, International Assessments
Teacher Education All aspects of teacher education, SCERT, DIET, Teacher
recruitment, In service training, Training of untrained
teachers
Civil Works School infrastructure/civil works, School Sanitation, School
safety, School grant, Swachhta Pakhwada
Equity PM’s 15 point programme, Special focus districts, LWE
districts, Interventions for SC/ST /Minorities and
Aspirational districts of NITI Aayog
Gender Girls education for Integrated Scheme including KGBV
&Girls hostel, Beti Padhao Beti Bachao
Inclusive Education All aspects of inclusive education for CWSN
Research, Evaluation &
Documentation
Research & Evaluation of scheme, Research studies and
documentation
Community Mobilization Community Mobilization, Community Training,
Constitution of SMC/SMDC
ECCE Pre-school and ECCE
RTE& Policy All matters related to SSA-RTE & NCPCR, Policy related
to the scheme
Legal Court/Legal cases, LIMBS
Media All matters related to media
Vocational Education All aspects of vocational education & skill development
Besides, these areas, any new units may be setup as per requirement, after approval of PAB.
In addition to the regular assignments, the experts engaged in Technical Support Group
scrutinize the various study reports, review reports, evaluation reports etc. submitted by other
organizations and take further follow up action.
10.4 STATE LEVEL ADMINISTRATIVE STRUCTURE
10.4.1 There would be a single Implementation Society for the Integrated Scheme at the
State Level. This would facilitate better decision making at the state level by resolving issues
of coordination and convergence. It will also provide a focused and time bound arrangement
for decision-making and the presence of representatives of Planning and Finance
Departments on these bodies at the state level would facilitate this process. The management
structure at the State Level is depicted in figure 2, along with the broad Roles and
Responsibilities at Table 3.
DRAFT DOCUMENT
167
Figure 2: Management structure at the state level
10.4.2 The Governing Council at the State level could be headed by the Chief Minister/State
Education Minister and the Executive Committee by the Chief
Secretary/Commissioner/Education Secretary of the State/UT. Representation of Finance and
Planning Departments on the Governing Council and the Executive Committee would
facilitate decision-making. The linkage with the mainstream educational administration set up
has been emphasized.
Table 3: Roles and responsibilities of the state level bodies and administrative
structures
Administrative Structure Administrative Head Roles and responsibility
Governing Council Chief Minister/State
Education Minister
To provide policy direction and
facilitate centre - state coordination.
Executive Committee Chief
Secretary/Education
Secretary
Full administrative powers to implement
the programme.
SCPCR :State Commission for Protect of Children Rights
SIEMAT : State Institute of Educational Management and Training
SCERT : State Council of Educational Research and Training
 *An illustrative TSG structure has been provided at National level, however the
States/UTs may have smaller or similar structure depending on the number of schools in
the State/UTs
Governing Council
Executive Committee
State Project Director
District Project Office
SCERT SCPCR
Technical Support Group*
SIEMAT
DRAFT DOCUMENT
168
Administrative Structure Administrative Head Roles and responsibility
State Implementation
Society
 The scheme will be implemented
through a registered society in the State.
Each implementation society is
accountable to the General Council and
Executive Committee.
State Project Office State Project Director This is the most crucial unit for actual
implementation of the programme. This
is the unit, which establishes links, with
district and sub-district levels structures,
resource structures, NGOs, state
government, national bureau and all
others concerned.
SCERT Director Provide necessary technical and
academic support, with focus on teacher
education and management.
SIEMAT Director Provide technical and professional
support for strategic planning and
management of interventions at state,
district and sub-district levels.
TSG of the State
Implementation Society
SPD Provide technical support to the SPO in
planning and managing the Integrated
Scheme.
10.4.4 The SIS should have effective monitoring and operational support units. Creation of
effective EMIS Unit, a team of experts to provide support in specific functional areas, regular
monitoring, supervision and appraisal activities, etc. are to be organized by the State
Implementation Society. The Integrated Scheme allows States/UTs to have their own
management structures, respecting the diversity that exists in these structures across the
states. This, however, does not mean that states would substantially deviate from the
administrative structure envisaged for effective decentralized management of the Scheme. In
fact, the effort is to empower schools to take their own decisions, within the overall
management context of a State/UT.
10.4.5 While making an assessment of manpower needs, States must assign the top most
priority to engaging experts for MIS, community mobilization and gender related
interventions. In context of specific situations, engagement of experts for education of SC/ST
children, minority children, education of children with special needs, etc., may also be
considered. Similarly, in States where the institutional capacity for quality interventions is
weak, engagement of experts on pedagogy, teacher training and ICT based learning may also
be considered.
10.4.6 Effective management of accounts also requires effective training and capacity
building of personnel through specialized training on financial management and procurement
procedures, the details of which are available in the chapter on Financial Management and
Procurement, at State and district level besides strengthening of the financial management
machinery at the Block level.
DRAFT DOCUMENT
169
10.4.7 The State level Implementation Societies should have an effective mechanism for
interdepartmental coordination and convergence.
(i) The Finance Department must provide adequate and appropriate financial
allocations and timely release of funds at all levels.
(ii) The Public Works Department need to re-conceptualise and re-design school
spaces from the pedagogic and safety perspective, and address issues of
inclusion for children with disabilities through barrier free access.
(iii) The Department of Science and Technology should provide geo-spatial
technologies for school mapping and location to supplement social mapping
exercises at the grassroots level.
(iv) Programmes for Water and Sanitation must ensure access to adequate and safe
drinking water, and accessible and adequate sanitation facilities especially for
girls in schools.
(v) The RTE Act mandates that every child of the age 6-14 years must be in
school; this pre-supposes that child labour will be eliminated. The Labour
Departments must align their policies with the RTE Act so that all children
participate in the schooling process regularly.
(vi) The immense relevance of inclusive education, particularly of disadvantaged
groups, demands vibrant partnerships with the departments and organisations
concerned with children of SC, ST, and educationally backward minorities.
(vii) Systems for equal opportunity for children with special needs will need to be
addressed with the departments handling children with disabilities.
(viii) The Rural Development and Panchayat Raj Departments would need to
accelerate poverty reduction programmes, so that children are freed from
domestic chores and wage earning responsibilities.
(ix) State Governments must simultaneously ensure that the Panchayat Raj
Institutions get appropriately involved so that the “local authorities” can
discharge their functions under the RTE Act.
(x) There is need for close cooperation with the NCPCR/SCPCR and the
Departments of Women and Child Development to ensure that all children get
their rights under the RTE Act.
(xi) Programmes under the National Rural Health Mission must take up school
health programmes, including de-worming and micro-nutrient
supplementation, with special attention to vulnerable groups, especially girls
approaching adolescence.
(xii) The Sports Departments would need to build in physical education and yoga
for the overall physical, social, emotional and mental development of the
child.
DRAFT DOCUMENT
170
10.5 DISTRICT LEVEL ADMINISTRATIVE STRUCTURE
10.5.1 The District Level Management Structure is depicted at Figure 3. The main role of the
District Project Office (DPO) would be to implement and review the progress of the
programme and widen networking with the participating agencies. Depending on the State, it
would be headed by District Collector/ Magistrate/ Chief Executive officer of the Zilla
Parishad. It should comprise representatives from district education department, NGOs as
well as technical specialists.
Figure 3: Management structure at the district and sub-district levels
10.5.2 The District Education Officers (DEOs)/District Project Coordinator (DPC) may be
in-charge of the District Project Office (DPO). DPO would have, more or less, all the units
that are envisaged at the state level. It would liaise with DIET to oversee the functioning of
BRCs and CRCs. Each of the 6-8 unit heads in the set up of DPO would function in matrix
mode, which implies that each unit head would have responsibility for one or more subject
areas as well as over one or more blocks.
CEO : Chief Education Officer
DIET : District Institute of Education and Training
BRC : Block Resource Center
CRC : Cluster Resource Center
SMC : School Management Committee
SMDC : School Management and Development Committee
Collector/CEO
District Program
Coordinator
Lead School Block Education Office
School- 1
DIET
School-2 School-3
CRC
District Project Office
(DPO)
SMC/SMDC
DRAFT DOCUMENT
171
10.5.3 Roles & Responsibilities of District Education Officer/ District Project Office
(i) Prepare Annual Work Plan & Budget based on the block plans so as to make it
more focused, relevant and need based. Coordinate with State Executive
Committee for approval of the District Plan and coordinate for fund releases as
per sanctions
(ii) Work with DIETs in preparation of plans and monitoring and in the conduct of
teacher trainings
(iii) Ensure regular training of the teachers/school heads, SMC/SMDC members,
BRCs, CRCs and other stakeholders in the aspects specified by the Act and the
scheme.
(iv) Coordinate with District Level Committee constituted to oversee the Project
Implementation
(v) Monitor Progress and status of Project Implementation
(vi) Management of Learning Outcomes which would mean simply measuring
Key Performance Indicators (KPIs) related to learning outcomes including
those used in Achievement Surveys.
(vii) Monitor the progress of the Learning Outcomes against the planned targets in
the Results Framework of the Scheme; and share the same with the key
stakeholders.
(viii) Design strategic interventions at the district, sub-district and institutional
levels to address gaps in Learning Outcomes.
10.6 BLOCK LEVEL ADMINISTRATIVE STRUCTURE
10.6.1 The administrative structure at the Block level would be headed by Block Education
Officer and the main role of these structures would be to provide academic supervision and
on-site support to the field level functionaries, capacity building, monitoring the actual
implementation of various interventions at the grass root level by interacting with the field
level officers and providing information to the District Project Office.
10.6.2 The academic support at sub-district levels is provided by BRC at block level and
CRC at cluster level. In urban areas the academic support at sub-district level would be
provided by Urban Resource Centre (URC) and at cluster level by CRC. If the municipality
or town development authority has academic staff, they may be deployed in the URCs/CRCs.
The District Project Office (DPO) in association with the DIET/DRC in the district would
collaborate with all these URCs/BRCs and CRCs for planning and implementation of
activities. The selection of the core team has to be very careful, as that would determine the
quality of programme implementation. Setting up of EMIS team at block level has to be done
on priority in order to put in place an effective MIS. The infusion of additional contractual
staff will only be after an assessment of the existing staff strength.
DRAFT DOCUMENT
172
10.6.3 Roles & Responsibilities of Block Education Officer
(i) Facilitate preparation of School Development Plan in coordination with
Block/cluster resource persons, SMC/SMDC Head Masters, teachers etc.
(ii) Coordinate and Conduct workshops & trainings with subject teachers
(iii) Provide active coordination in teachers re-deployment and infrastructure
utilisation
(iv) Monitor the work of BRPs and CRPs
(v) Ensure regular update of U-DISE and carrying out data analysis. Using
technology for collection and analysis of data
(vi) Conduct review and performance meetings with BRCs, CRCs, SMC/SMDC
and teachers regarding children academic performance and monitor children
growth and special training needs of the children
10.7 Planning Process
10.7.1 Institutional Arrangement for Planning: Need based planning and successful
implementation of the programme require several institutional reforms as well. Therefore,
reforms in educational administration including modernization /e-governance and
decentralization are highly necessitated for effective, efficient and better programme
implementation. In this regard, institutional involvement in planning & plan preparation is
essential.
10.7.2 Convergence: In addition, focus is also on convergence and coordination with
various other Departments. In this respect, all States/UTs may put in place an institutional
mechanism for ensuring convergence & coordination with the different Ministries like
Ministry of Tribal Affairs, Ministry of Youth Affair and Sports, Ministry of Science and
Technology, Ministry of Women and Child Development, Ministry of Health and Family
Welfare, Finance and Planning Department including representatives of these
Departments at State and District level Committees that anchor planning and
implementation activities.
10.7.3 Role of Educational Institutions: A systematic and comprehensive approach is
urgently needed to identify and effectively use the synergies that exist among the existing
institutions in the States/UTs. In view of improving planning & implementation of the
integrated programme, academic as well as other resource institutes like NCERT including
RIEs, SCERT, SEIMAT, State Open schools, IASEs, CTEs, State Board, QCI, Universities,
NIN, CTC etc. that exist in the State/UT and at national level in general will play vital role in
enhancing and enlightening the State/UT educational strategies in the following key areas:
● Plan formulation process
● Development of teachers training modules and other modules
● Development of SMCs training modules and Training of SMCs
● Capacity building of district and state functionaries
● Curriculum revision
DRAFT DOCUMENT
173
● Academic Monitoring & Supervision and Research
● Assessment of students & teachers performance
● Facilitating meetings between the State Boards, and regular education department
and other resource institute
● Planning for innovative interventions etc.
10.7.4 Need based Planning: Based on the experience of the earlier programme
implementation (DPEP, SSA, RMSA etc.), it is felt that approach and strategy towards
planning and implementation needs to be more holistic and result oriented. Hence, any
strategy to address a gap under the integrated scheme has to be in the form of a complete
school level package paying special focus to the marginalized sections of the society. The set
of activities which may help addressing these identified gap will definitely lead to a desired
outcome within the set time period and therefore, this is referred to as ‘Outcome Oriented
Intervention’.
10.7.5 Evidence Based Planning: The objective of planning exercise is to ensure rational
allocation and the optimum utilization of resources. Hence, focus of planning will be less on
issues pertaining to the allocation of resources rather it is more on making the best use of the
available resources. Planning is not to be initiated as a onetime exercise; it is a continuous
process and unfolds itself in the process of implementation. Further, it also focuses on
operational details to ensure achievement of the targets. Now, strengthening educational
process at the local level is the major focus of the micro-planning exercise so as to ensure an
integrated approach. Henceforth, it should be seen as a regular feature and should be with the
active participation of stakeholders at every stage and level.
10.7.6 Unit of Planning: One of the first steps in initiating holistic planning is to select a
suitable unit for planning. The major consideration for the selection of the unit is the
feasibility of initiating and preparing a local plan with the active participation and support of
the community. It needs to be noted that realistic planning exercise envisages close
interaction between community and school. The basic plan framework is to be generated at
the school level through micro planning process where SMCs/SMDCs, PRI members and
other stakeholders are involved. Thus, the plan is to be developed at the school and
habitation level.
10.7.7 Need identification process: It is to be started right from the community level in
respect of equitable Access, Infrastructure gaps, Equity, Quality in terms of teachers, teachers
training, Curriculum etc., Civil Works and other components including coverage of Special
focus group should be identified by the community itself after intensive interaction with the
headmasters/principals and teachers. The Proposals and issues related to the above
components need to be streamlined and verified at the district level before these are finally
consolidated at the state level. Analysis of the data and a write-up on the result outcomes of
the plan is also an important planning strategy.
DRAFT DOCUMENT
174
10.7.8 UDISE based planning: School Education database is of paramount importance for
universalization of access to and improvement of quality right from the preparatory stage.
Some of the urgent activities include identifying deficiencies in existing secondary
schools/Senior Secondary schools, identifying upper primary schools for up-gradation,
identifying underserved areas to establish new schools, streamlining for non-government
schools, developing state specific norms for physical facilities etc. In order to initiate a
comprehensive school mapping exercise at Secondary and Senior secondary level, it is
necessary to develop a reliable data base, i.e. creation of databank under UDISE with
disaggregated data at the State, District, Block and School Level is highly essential.
10.7.9 Plan Preparation: The ‘Integrated School Education Plan’ should be prepared in
the form of AWP&B for the State that should be certainly aimed at addressing the following
key components of holistic education:
● Physical access to school, preferably composite ones and ensuring equitable
access including for special category of students/ location as identified by the
State as disadvantaged category in the State/ district.
● Improving equitable quality of school education - teachers in place, learning /
achievement of students, overall outcomes, and empirical regular assessments.
● Bridging Gender & Equity gaps in terms of enrolment, retention and quality
● Improving governance- institutional strengthening.
● Improving convergence & linkages with existing institutions/ departments/
organizations etc.
10.7.10 School Improvement/Development Plan (As per Section-22 of RTE Act):
Each School Management Committee (SMC) is authorized to initiate the school level
planning in collaboration with the active community members, NGOs, Civil Society,
individuals etc. for preparation of a school level plan including pre-school level which is
termed as “School Development Plan (SDP)” or “School Improvement Plan”. Initially the
preparatory phase starts with the SMC meeting which ensures community participation (as
per section-21 & part-V of RTE Act). The SDP primarily includes identification of gaps in
development of infrastructure, achievement of students, needs of existing teachers, parent’s
expectation, classroom transaction process etc. Hence, the SDP provides requirements of
each school which is finally compiled at the district level and in turn all these SIPs of the
district need to be accumulated at the State level for formulation of one ‘Integrated State
Consolidated Plan’.
Decentralized Planning Process:
National Level Appraisal of the Plans Project Approval Board
(PAB)
School (SMDCs)
(Plan Preparation / Finalization-SIP)
Need Identification
Process
Consolidation of the
Needs
State Level Analysis of the Plan Consolidation &
Finalization
District Level Checking
(School Plan)
(Consolidation of the
Plan)
DRAFT DOCUMENT
175
10.7.11 Consolidation of AWP&B at district & state level: A single state
consolidated plan is to be developed at the state level therefore, state should prepare an
AWP&B after appraising and consolidating the District level plans. The district planning
team, in turn, will appraise all the SDPs, prioritize them and consolidate all so as to finalize
the ‘District School Education Annual Work Plan & Budget’.
10.8 Monitoring Programme Implementation and Outcomes
10.8.1 The monitoring framework envisaged is result oriented and focuses on strengthening
management of the programme at district, block and school levels. Promoting school based
management of the relevant interventions is one of the major focus areas of the monitoring
framework. While the emphasis on monitoring programme inputs would continue, renewed
emphasis has been on monitoring outcomes and results in the Scheme. Accordingly, the
Results Framework Documents would be used for planning and monitoring outcomes and
results in school education at national, state and district levels.
10.8.2 Monitoring growth of schools in terms of their effectiveness in reducing wastage and
enhancing learning outcomes would be another focus area in the framework. A bottom up
approach of monitoring and feedback system has been envisaged to promote vertical
accountability. At the same time, necessary institutional arrangements and interventions have
been envisaged to enhance horizontal accountability.
10.8.3 Creating and strengthening necessary databases for planning and monitoring of results
has been emphasized in the management framework. Accordingly, investments on MIS at
national, state and district levels would be enhanced. The use of school report cards for
raising accountability and transparency of the system would be facilitated in the management
framework. Deepening research and innovation in school education is considered important
for monitoring programme implementation and the expected results.
10.9 Monitoring at the Institutional Level: Role and responsibilities of the
SMC/SMDC:
10.9.1 The monitoring of the scheme will start from the school level. Social audit would
facilitate the checking, monitoring and verification of the implementation of the interventions
of the Integrated Scheme at the school level. Transparency, participation and accountability
will be maintained through social audit in programme implementation. Social audit at the
village level can be done at any point of time during the planning, preparation and
implementation of Integrated Scheme. To conduct social audits, an enormous amount of
community mobilisation is necessary. Social audit is carried out by the community and the
entire Gram Sabha with the help of stakeholders like local authority, members of SMC/VEC,
PTA, Self Help Groups (SHGs), youth clubs, Mahila Samooh and representatives of
disadvantaged groups, etc.
10.9.2 The role of SMC/SMDC, with regards to Social Audit, becomes important for
promoting horizontal accountability. Social Audit is not only done for verification of fund
DRAFT DOCUMENT
176
utilization but also to create awareness and a sense of ownership among the stake holders
about the facilities provided, through their active involvement and participation in the schools
in their neighbourhood. It should be noted that community and SMC/SMDC members can
never conduct an efficient Social Audit without the help of Local Authority Members,
Officials from CRC/BRC/BEO/DEO office and active civil society group. The support of the
SMC/ SMDC and village based organizations would be invaluable in communicating in
simple and creative ways, the rights of the child as enunciated in the RTE Act, also to the
population in the neighborhood of the school; as also the duties of the appropriate Government,
local authority, school, parents and guardians. A community based monitoring system
involving SMC/SMDC may be created to monitor the implementation. This will enhance
transparency in the System and enhance learning levels of children.
10.9.3 The active participation of local Authority, SMCs/SMDCs and PRIs and the
community can facilitate the process of identifying gaps, highlighting violations and create
space for initiating education dialogue (Shiksha Samvad) and sharing of learning outcomes in
(Jana Vachan) in order to improve quality of education.
10.9.4 The community participation will:
(i) ensure the enrolment and attendance of all the children and especially children
belonging to disadvantaged groups and weaker sections in the school(s);
(ii) ensure that children belonging to disadvantaged groups and weaker sections are
not discriminated against, and prevented from pursuing and completing school
education.
(iii) monitor that all not-enrolled and drop out children are facilitated to join the
mainstream (Section 4 of the RTE Act also mandates the provision).
(iv) monitor the identification, enrolment and participation of children with disability
in school education, and ensure that facilities for their education are provided.
(v) ensure that child rights under the RTE Act, especially rights with respect to
prohibition of physical and mental harassment, expulsion and detention, the
provision of any-time admission are observed in letter and spirit, and that child
entitlements, including uniforms, textbooks, scholarships as per norms, mid day
meal safety and security, etc are provided in a timely manner. Deviations would
be taken up with the Head Teacher/ Principal. The SMC/SMDC would bring
instances of persistent disregard of child rights to the notice of the local
authority.
(vi) Monitor the maintenance of the norms and standards specified in the Schedule to
the RTE Act and other concerned policies.
(vii) Maintenance of hygiene and Toilets in keeping with Swachh Bharat Swachh
Vidyalaya initiative.
(viii) Monitor that teachers are not burdened with non-academic duties other than
those specified in Section 27 of the RTE Act. viz., decennial population census,
and elections to Parliament, Legislature and Local Bodies;
(ix) ensure that teachers maintain regularity and punctuality in attendance, hold
regular meetings with parents to apprise them about their child’s progress, and do
DRAFT DOCUMENT
177
not engage in private tuition
(x) ensure that the learning outcomes, midday meal details and swatchhta rating of
the school are displayed in the school.
10.10 School Supervision by Block and Cluster/Lead School Functionaries
10.10.1 Improvement of quality of education is a pre-requisite of successful
implementation of the Integrated Scheme. In order to achieve this, periodic
inspection/supervision of schools to observe the infrastructure and facilities and the
administrative and academic aspects is critical. In addition, a proper system of academic and
curricular support has to be developed to serve the purpose of continuing professional
upgradation of teachers and to see that school syllabi and learner evaluation system such as
NAS are operationalised as expected.
10.10.2 Each BEO should be supported by Assistant Education Officers (with
whatever designation) who should be expected to undertake at least two visits to every school
each year. Among other things, they should look at the record required to be maintained by
teachers/headmasters/principals, condition of school building and infrastructure and seating
arrangement for students. They should be asked to pay particular attention to availability of
potable drinking water, hygiene and maintenance of toilets, kitchen where MDM is cooked
and whether the school has well-maintained boundary wall and ramps.
10.10.3 Each BRC has specialist staff of 5-7. Besides, there are a number of CRCs,
approximately one for every 15 villages. Between the staff of these two resource centres, it
should be possible for someone to visit each school once every two months, and every month
if possible. The purpose of these visits would be to provide curricular support to teachers –
particularly progress with syllabus, the manner in which use is made of textbooks and other
materials, assess and support teachers develop TLM and the manner in which continuous and
comprehensive evaluation is being implemented. In addition, lead Schools/BRCs should
conduct workshops with subject teachers of Secondary and Senior Secondary classes and
they as well as CRCs should organise trainings expected of them.
10.10.4 The staff from the office of BEO as well as from BRCs and CRCs should
ordinarily not be expected to prepare inspection/visit reports. Rather, they should record their
main observations in a register to be maintained in each school. Principals/HMs/teachers
should take action on the visit note and apprise the visiting officials/resource persons. In
addition, computer with internet connectivity should be available in the office of BEO, and in
BRCs and CRCs so that important observations (particularly points on which administrative
action is to be taken) are quickly shared. Professional Learning Community (PLC, a sort of
peer learning group) should be encouraged by bringing community personnel into the school
to enhance the curriculum and learning tasks for students; or engaging students, teachers, and
administrators simultaneously in learning.
DRAFT DOCUMENT
178
10.11 Monitoring at the District Level
 DPO will monitor the progress of the scheme at the district level. The following
mechanisms will be used for monitoring the programme:
(i) Independent and regular field visits to monitor performance by Social Science
Monitoring Institutes.
(ii) Regular visit to field by Resource Persons and TSG Consultants
(iii) Visits by District Level Committee comprising local/public representatives to
monitor the implementation of the programme
(iv) Unified District Information System for Education (U-DISE)
(v) DIET would monitor interventions for teacher education and professional
development
(vi) Targeted outcomes and intermediate results stated in the District Level
Results Framework, which would form an integral part of the District
Education Plan
10.12 Monitoring at the State Level
10.12.1. The following monitoring mechanism is provided at the state level:
(i) SCPCR or Right to Education Protection Authority
(ii) Periodic meetings of the State Executive Committee
(iii) State level quarterly review meetings with State Coordinators of important
functional areas including financial management.
(iv) Internal audit by the States.
(v) State specific responsibilities to Research and Resource Institutions for
supervision, monitoring, evaluation and research activities.
(vi) Unified District Information System for Education (U-DISE)
(vii) Online Monitoring System
10.12.2 The SIS will also undertake intensive monitoring through State Project Office.
Representatives of National level institutions like NCTE, NIEPA, NCERT and TSG will also
undertake periodic monitoring and provide resource support to the SIS to strengthen
planning, management and monitoring systems. Efforts to associate autonomous institutions
willing to take up State specific responsibilities for research and evaluation would continue.
Independent institutions would also be associated in developing effective tools for conducting
achievement tests, monitoring quality aspects of programme implementation, undertaking
evaluations and research studies.
10.12.3 Monitoring at the state Level would include the following aspects:
(i) Availability of schooling facility at Elementary, Secondary and Senior
Secondary levels in all the habitations to ensure physical and social access in
the neighbourhood, as defined.
(ii) Addressing needs of children living in very small hamlets (in remote,
desert/tribal areas) where opening of schools is not viable and ensuring access
DRAFT DOCUMENT
179
by providing free transportation to and from school and/or through residential
facility to ensure access for such children.
(iii) The school development plans which have to be prepared by SMCs/SMDCs to
ensure that schools have all facilities such as infrastructure, teachers, TLE and
child friendly and barrier free access with good learning environment.
(iv) Issues of gender and social inclusion.
(v) Ensuring age-appropriate admission and completion of education for children
especially those belonging to the disadvantaged groups such as children of
SC/ST communities, Muslim and other minority children BPL, girls, urban
deprived children, street children/child labour and children without adult
protection etc.
(vi) The process of providing special training/remedial teaching to the children
who are admitted in schools to bring them at par with other children.
(vii) Formulation of child rights based policies and enabling provisions
(viii) Targeted outcomes and intermediate results stated in the State Level Results
Framework
10.13 Monitoring at the National Level
10.13.1 Monitoring at the national level would include the following aspects:
(i) Availability of schooling facility at elementary, secondary and senior
secondary levels to provide physical and social access to all habitations in the
neighborhood, as defined by the State under RTE Act/Scheme Framework.
(ii) Addressing needs of children living in very small hamlets (in remote, desert/
tribal areas) where opening of schools is not viable and ensuring access by
providing free transportation to and from school and or through residential
facility to ensure access for such children.
(iii) The school development plans which have to be prepared by SMCs/SMDCs to
ensure that schools have all facilities such as infrastructure, teachers, TLE and
child friendly and barrier free access with good learning environment
(iv) Issues of gender and social inclusion
(v) Ensuring age-appropriate admission in neighborhood schools for children
especially those belonging to the disadvantaged groups such as children of
SC/ST communities, Muslim and other minority children, girls, urban
deprived children, street children/child labour and children without adult
protection etc.
(vi) The process of providing special training to the children who are admitted in
schools to bring them at par with other children.
(vii) Formulation of child rights based policies and enabling provisions for
implementing the RTE Act, 2009.
10.13.2 The following monitoring mechanisms will be used:
(i) Targeted outcomes and intermediate results stated in the National Level
Results Framework.
DRAFT DOCUMENT
180
(ii) National level half yearly review meetings and quarterly regional review
meetings with State Education Secretaries and State Project Directors.
(iii) Joint Review Missions by Government of India, the State Governments and
(any) external funding agencies.
(iv) Independent assessment/studies to be carried out for independent feedback on
implementation of the programme.
(v) U-DISE giving annual school based data with school and district/State report
cards.
(vi) SDMIS giving student-wise data on school progression and outcomes.
(vii) Statutory audit of accounts annually by Chartered Accountant Firms (from
CAG approved panel)
(viii) Concurrent Financial Review of Accounts
(ix) Internal Audit by State /UT
(x) Periodical review of physical and financial progress of the programme by TSG
(xi) Field visits.
10.14 Other Interventions for Monitoring Implementation and Outcomes
In addition, the following monitoring mechanism will be included at National level:
10.14.1 Strengthening U-DISE& SDMIS/Extended U-DISE
10.14.1.1 The existing education management information system based on the annual census
of schools, called the U-DISE, will continue to be implemented and further strengthened
throughout the country, particularly at the district level. Through this system, data on
important aspects of a school, such as physical infrastructure and facilities, availability of
teachers, enrolment by social category, age of a child, medium of instruction and training of
teachers, etc. is collected annually. Certain new variables have been added in the DISE Data
Capture Formats (DCF) to ensure monitoring of all aspects of the Integrated Scheme. UDISE data would be largely used for developing and monitoring the Results Framework of
the scheme at national, state and district levels, which in turn would serve as a monitoring
tool. The SDMIS data would be extremely useful for monitoring and assessing the
effectiveness of various interventions of the scheme in delivering the desired results. Costeffectiveness studies of public interventions based on SDMIS would facilitate informed
decision-making, particularly in designing programme interventions and making the same
result-oriented.
10.14.1.2 The U-DISE data covers all schools irrespective of its type i.e. recognized or unrecognized, and its management, whether government or private. The data collected under UDISE should be used for all purposes and treated as official data for the State.
10.14.1.3 The U-DISE based information and analysis throws light on infrastructure
facilities, access, retention, teacher-related issues and are immensely useful for monitoring,
planning and mid-course corrections. Teachers’ rationalization, prioritization of physical
DRAFT DOCUMENT
181
infrastructure and teachers’ training issues can be addressed through effective use of UDISE data.
10.14.1.4 U-DISE data must undergo consistency checks and requisite post enumeration
survey. In order to increase transparency, the information provided by the schools to U-DISE
should be publicly displayed in each school. The U-DISE software has the facility to print
School Report Cards which can be displayed on notice board of each school. Moreover, the
schools report cards can also be printed from the web-site (www.schoolreportcards.in).
Besides this, a system of reading DISE data to the community through a Shiksha Gram Sabha
or Jan-Vaachan should be carried out in respect of each school by the SMC.
10.14.2 Extended U-DISE (Shaala Kosh)
10.14.2.1 This initiative will leverage the power of technology to enable data collection from
all levels of the education ecosystem, its consolidation and analysis at central level, and its
usage for teachers, headmasters, and administrators at block, district, state and central level
for decision making. The overall objectives sought to be achieved through the platform are:
• To act as a one-stop platform for data needs of all stakeholders in the school
education system
• To facilitate the transition from a paper based system to a complete digital system
in the long term
• To improve school management and sector governance by streamlining processes,
creating transparency and driving accountability through the use of data
• To provide complete support for improving student learning outcomes
10.14.3 Shagun
10.14.3.1 The online monitoring module of Shagun measures state-level performance and
progress against key educational indicators which enables the Government of India and the
State and UT Departments of education to conduct real-time assessments which normal
paper-based monitoring mechanisms did not allow.
10.14.3.2 The portal offers Data analytics and generates graphics which represent the
progress of States and UTs against key identified parameters such as exact number of out of
school children mainstreamed, the increase or decrease in enrolment in government schools
vis-à- vis private schools and the expenditure on teachers’ salaries compared to expenditure
on increasing the learning outcomes, and more.
10.15 Project Monitoring System (PMS)
10.15.1 In a significant step towards leveraging technology to enhance efficiency and manage
the implementation of Integrated Scheme, a Project Monitoring System (PMS) has been
developed, in which States/UTs may view the Status of Central Releases, approved outlays,
DRAFT DOCUMENT
182
coverage as per U-DISE, school wise list of approvals, school wise gaps, cancellations in
approvals etc. In addition, on line submission of Monthly Progress Reports, physical as well
as financial, can also be made by the respective State/UTs in the PMS.
10.15.2 Core objective for implementation of Project Monitoring System is:
(i) To obviate the need for submitting hard copies, except where it is mandated
otherwise.
(ii) To have transparency and accuracy in the System w.r.t Approvals, Releases,
Financial Status.
(iii) To streamline the Financial Management System, to enable more accurate
assessment of actual requirement of funds for implementation.
(iv) To ensure efficient decision- making.
10.15.3 The main functions are:
(i) Submission of Annual Work Plan & Budget
(ii) Appraisal and finalization of Annual Work Plan as per PAB approvals
(iii) Generation of Sanction Order for Central Releases:
(iv) Monthly Progress Reports Physical and Financial upto school level
(v) Utilization Certificates at State level
10.16 National Achievement Survey
The survey aims to create a culture of learning and achievement in the school system
by focusing on the learning levels of students. By assessing the students in Government and
Government-aided schools across the country and tracking student-level learning
performance, the survey will raise awareness on the current learning levels of students. The
survey will be able to provide valuable insights on learning levels which can be used to
design support to improve the quality of learning in the school system. Baseline assessment
of learning achievements at the Elementary and Secondary levels will be done by NCERT.
10.17 Shaala Siddhi
The need for effective schools and improving school performance is increasingly felt
in the Indian education system to provide quality education for all children. The quality
initiatives in school education sector, thus, necessitate focusing on school, its performance
and improvement. Shala Siddhi is a major step towards comprehensive school evaluation as
central to improving quality of school education in India, National Programme on School
Standards and Evaluation has been initiated by NIEPA. The Shaala Shiddhi Framework may
be utilised for planning purpose for the whole school and monitoring the progress.
10.18 Results Framework at National, State and District Levels
 The Results Framework to measure outcomes against the pre decided targets and
baseline. A Results Framework with identified measurable indicators, baseline and targeted
results and frequency of measuring outcomes has been developed and has been in use for
some time. The States/districts are expected to develop the State/district specific Results
Framework on the suggested indicators. The RFD will not only comprise of outcomes of the
DRAFT DOCUMENT
183
Scheme in the form of measurable indicators which can be used to evaluate the scheme
periodically. Intermediate indicators will also be monitored periodically and baseline data or
survey against which such outcomes also are benchmarked which gives a scope to improve.
10.19 Surveys and Research studies
10.19.1 In order to assess Integrated Scheme’s impact across the states on education
indicators like enrolment, student/ teacher attendance and retention etc. Surveys and Research
Studies will be conducted at the National/State levels. The findings of these surveys and
studies help in ascertaining the degree of success on key indicators and assessment of needs
and gaps for course correction and follow-up.
10.19.2 States would need to give priority to developing and implementing, monitoring
systems to measure quality related outcomes, such as students learning outcomes, teacher
performance, student and teacher attendance rates by gender and social categories, as also
parameters for measuring changes in classroom practices, impact of teacher training, efficacy
of textbooks and textual materials, quality of academic supervision provided by BRCs/
CRCs/ DIETs etc.
10.19.3 The Scheme would encourage independent research and supervision by autonomous
research institutions. Institutions of proven excellence have been requested to take up State
specific responsibilities. The focus in partnership with institutions will also be on developing
capacities through the interaction in SCERTs /SIEMATs/DIETs to carry out research and
evaluation tasks. Faculty/Department of Education in Universities would also be requested to
participate in such activities under the New Scheme. The RIE of NCERT will also be
associated in these tasks.
10.19.4 Each State/UT Mission will set up a Research Approval Committee for processing
and approving all research and evaluation studies to be undertaken at the State level.
Appropriate mechanisms should also be set up for district level by the State. Involvement of
other independent national and State level resource institutions in conducting research
activities should be encouraged through appropriate MoUs/contracts. States need to upload
the initiative concerning innovation and research, use of ICT in the area of teacher education
on a repository/web portal.
10.20 Staffing Set-up at State, District and Block level: Since the states/UTs have been
advised to implement the programme through the existing manpower at the state, district and
block level, therefore states/UTs should re-arrange staffing structures and accordingly
rationalize the staff to meet requirement at all the levels. Although with the expansion of
programme planning & implementation followed by subsequent monitoring, a technical
support group at the state level may be formulated, the same can also be expedited at the
district level. The planning team at the district and block level may have the following
representatives which are suggestive in nature:
DRAFT DOCUMENT
184
A. State Planning Team:
District Planning Team:
District Education Officer / District Programme Coordinator
Block level Planning Team:
Block Education Officer/Coordinator
The above planning support group is mainly to look after:
• The plan formulation,
• Project planning & implementation,
• Project monitoring at district/block/cluster and school level under the direct administrative control of State
Project Director/Director School Education.
Director School Education State Project Director (SPD) Director SCERT
Deputy Director Deputy Director
Component in ChargeCoordinators
Resource Persons (RPs) – To be
nominated by the State as per need
District Consultant/Coordinators, District Project Inspector of Schools
Engineer/ Jr. Engineer
Planning & Statistical Officer KRPs& MTs
Block level Coordinators; Block level Project Block Resource Persons
Engineer/ Jr. Engineer
 Planning Officer/Component In-charge
DRAFT DOCUMENT
185
10.21 Distribution of Staff at State and District level: Looking into the programme
management/staffing system that exist at the state/district level for both the programme-SSA
and RMSA, it has been found/observed that multiple staffs of the components are in place at
the state as well as at the district level office that in turn captured opportunity for other
component staff requirements. Therefore, taking into account this aspect, multiple staffing
structures at both the level-state & district should be avoided and prioritized on need based.
In view of limited MMER cost and concerning cost effectiveness, States/UTs are advised to
utilize staff either on deputation from the existing education
departments/SCERT/SIEMAT/DIET/CTE/other academic institutions etc. In case of
additional manpower requirement, then staff may be hired on contract basis with a provision
earmarked on need based of the scheme component. Following is the suggestive staff
distribution as per scheme scope & programme objectives:
Staffing at State, District & BRCs level:
A. Distribution of Staff in the States-SPO & DPO level other than the NER& UTs:
S.
No.
Name of Component: No. of Staff:
SPO DPO
1 Access & Retention including RTE 2 1
2 Quality 2 1
3 Equity with Gender 1 0
4 IEDSS 1 1
5 ICT & Media 1 1
6 Vocational Education (VE) 1 1
7 MIS 2 1
8 RAA & Innovation 1 1
9 Planning & Monitoring 1 0
10 Community Mobilization & Research 1 1
11 Finance 1 1
12 Infrastructure/Civil Works 2 1
13 Procurement 1 0
 Total: 17 10
B. Distribution of Staff in the North-Eastern States/UTs-SPO & DPO level in the NER& UTs:
 Name of Component: No. of Staff:
1 Access & Retention including RTE 1 1
2 Quality 1 1
3 Equity with Gender 1 0
4 IEDSS 1 1
5 ICT & Media 1 0
6 Vocational Education (VE) 1 1
7 MIS 1 1
8 RAA & Innovation 1 1
9 Planning & Monitoring 1 0
10 Community Mobilization & Research 1 1
11 Finance 1 1
12 Procurement 1 0
13 Infrastructure/Civil Works 1 1
Total: 13 09
Note: Above indicated staff/component-in-charge are tentative in nature subject to requirements for the programme. This
may be revised with the approval of the state EC. A copy of such notification may be submitted to MHRD time to
time.
DRAFT DOCUMENT
186
10.22 Management Monitoring Evaluation & Research (MMER): MMER funds
may be utilized for:
Salary, Meetings& Consultancy fees:
• Salary of SPO and DPO level, Honorarium and Consultancy charges
• Remuneration & Consultancy fees for the resource persons (RPs), hiring of
experts and consultants.
• Expenditure incurred on meetings
Monitoring, Research& Administrative Expenses:
• Audit expenses and monitoring and supervision related activities
• Rent/rate and taxes, Telephone/Fax expenses
• Water/Electricity Charges and hiring of vehicles/POL/Administrative cost
Advertising & Publicity:
• Printing and stationary, Publication and repair and maintenance and other officer
contingencies etc.
• Internal audit fees and advertising and publicity.
• Imparting awareness about various schemes through media (Media Activity)
• Other media related activities
Procurement of fixed Assets& Capacity Building:
• Procurement of fixed assets such as computers, laptops, printers, furniture &
furnishing, machinery and equipments, Photostat, fax, infrastructure, books and
other office equipment.
• E-Governance support. Capacity building and strengthening of DIET/GISTs.
Capacity Building at Government in service training centres.
10.22.1 Proposal of MMER under the integrated scheme: The Management,
Monitoring, Evaluation & Research (MMER) proposals should be as per the following
details:
• Details of activity proposed under MMER. Details should include purposes and
outcomes.
• Budget implication against each activity
• Outcomes against monitoring activities at all level (School, District and State
level)
• Outcome analysis report on monitoring should be submitted as a sample of one or
two district.
• Any research activity proposal may include details –whether field research or
micro/macro level.
• Priority under MMER.
• Any other state provision
DRAFT DOCUMENT
187
ANNEXURE-VII
RESULTS FRAMEWORK MONITORING IMPLEMENTATION OF RTE ACT 2009 (RFD FOR ELEMENTARY EDUCATION)
Project Development Objective (POD): To ensure eight years of inclusive quality education for all children in the age group of 6-14 years in the
country through central sector support through Samagra Shiksha to school education in States
Results/ Key Performance Indicators Unit of Measure Base line 2016-17
Cumulative Target Values**
Frequency Data Source/ Methodology Responsibility for Data
Descriptio
n
(indicator
definition
etc.)
2017-18 2018-19 2019-20
Total Enrolment Grades I to V) Number (in million) Yearly UDISE NIEPA
Total Enrolment (Grades I to VIII) Number (in million)
Net Enrolment Ratio (Grades I-V) % Yearly Census projected population and UDISE NIEPA
Adjusted NER (Grades I-V) % Yearly Census projected population and UDISE NIEPA
Net Enrolment Ratio (Grades I-VIII)
Adjusted NER at Elementary Level (I-VIII) %
Gender Parity Index in Participation (I-VIII) Ratio Yearly AWP&B TSG
Social Parity Index in Participation (I-VIII) Ratio yearly UDISE NIEPA
Transition Rate from Grade V to Grade VI % Yearly UDISE NIEPA
Performance in Grade III (NAS) Percentile/mea n score Alternate Year NAS NCERT
Reading
Computing Alternate Year Alternate Year
Performance in Grade V (NAS) Percentile/mea n score
Reading
Computing
Performance in Grade VIII ( NAS) Percentile/mea n score
Reading
Computing
DRAFT DOCUMENT
188
18Each of the grades and categories of students, the percentile/mean scores in reading and computing would be reported annually based on the learning achievement
survey.
Number of girls per 100 boys enrolled in grades
I-VIII Number
% of SC enrolment to total enrolment in grades IVIII by management %
% of ST enrolment to total enrolment in grades I- VIII by management % Yearly UDISE NIEPA
% of CWSN enrolment to total enrolment in
grades I-VIII % Yearly UDISE NIEPA
Overall Transition Rate from Grade V to Grade
VI (Primary to Upper Primary) (Boys + Girls) % Yearly UDISE NIEPA
All Categories: Boys
All Categories: Girls
SC: Boys
SC: Girls
ST: Boys
ST: Girls
Dropout rate at primary level (grades I-V) Yearly UDISE NIEPA
Boys
Girls
Dropout rate at upper primary level (grades VI- VIII)
Boys
Girls
Number of out-of-school-children identified Number Quarterly PMS TSG
Total number of children get admission under
12(1)© Yearly PMS TSG
Performance in Grade III (NAS)18 Percentile/mea n score Alternate Year NAS NCERT
Boys
Girls
Performance in Grade V (NAS) Percentile/mea n score Alternate Year NAS NCERT
Boys
Girls
DRAFT DOCUMENT
189
Performance in Grade VIII ( NAS) Percentile/mea n score Alternate Year NAS NCERT
Boys
Girls
% of Elementary schools having teacher as per
RTE norms %
Government
Govt. Aided
% Upper Primary schools/sections meeting
subject-teacher norms as per RTE Yearly UDISE NIEPA
Government
Govt. Aided
% of teachers at Elementary levelwith
professional qualification as per NCTE norms % Yearly
AWP&B
&
UDISE
TSG & NIEPA
Government
Govt. Aided
% of teachers at elementary level who received
in- service training
Government
Govt. Aided
% of Elementary schools/sections having
functional boys toilet %
Government
Govt. Aided
% of Elementary schools/sections having
functional girls toilet %
Government
Govt. Aided
% of Elementary schools/sections having
functional drinking water facility %
Government
Govt. Aided
% of Elementary schools/sections having hand
wash facility
Government
Govt. Aided
DRAFT DOCUMENT
190
19Indicator to be reported by school management.
20Indicator to be reported by school management.
% of Elementary schools with electricity
connection19
% of Elementary schools with internet
connectivity20
DRAFT DOCUMENT
191
ANNEXURE-VIII
RESULTS FRAMEWORK DOCUMENT FOR PLANNING AND MONITORING OUTCOMES OF THE
SAMAGRA SHIKSHA21
Project Development Objective (PDO): To achieve increased and more equitable access to good quality education
through support of the Government’s ongoing program for Samagra Shiksha as delineated in its implementation
framework.
Results/Outcomes Indicators Unit of Measure
Base
line
2016-
17
Cumulative Target
Values** Frequency Data Source/ Methodology Responsibility for Data Description (indicator definition etc.) 2017- 18 2018- 19 2019-20
Total Enrolment (Grades I to XII) Number (in millions) Yearly UDISE NIEPA
Total Enrolment (Grades IX-X) Number (in millions) Yearly UDISE NIEPA
Total Enrolment (Grades XI-XII) Number (in millions) Yearly UDISE NIEPA
Gross enrolment Ratio at secondary
level (grades IX-X) % Yearly UDISE NIEPA
Gross enrolment Ratio at higher
secondary level (grades XI-XII) % Yearly UDISE NIEPA
Gender Parity Index (GPI) in
enrolment in secondary education Ratio Yearly UDISE NIEPA
Social Parity Index (SPI) in enrolment
in secondary education: Scheduled
Castes
Ratio Yearly UDISE NIEPA
Social Parity Index (SPI) in enrolment
in secondary education: Scheduled
Tribes
Ratio Yearly UDISE NIEPA
Gender Parity Index (GPI) in Ratio Yearly UDISE NIEPA
21This Results Framework Document (RFD) is to be considered along with the Results Framework Document for planning and monitoring outcomes at the elementary level
for getting the complete picture of the planned outcomes of the Integrated Scheme for School Education and the actual progress towards the same. Moreover, this RDF
focuses more on managing outcomes at the post-compulsory level of school education.
DRAFT DOCUMENT
192
Project Development Objective (PDO): To achieve increased and more equitable access to good quality education
through support of the Government’s ongoing program for Samagra Shiksha as delineated in its implementation
framework.
Results/Outcomes Indicators Unit of Measure
Base
line
2016-
17
Cumulative Target
Values** Frequency Data Source/ Methodology Responsibility for Data Description (indicator definition etc.) 2017- 18 2018- 19 2019-20
enrolment in higher secondary
education (grades XI-XII)
Social Parity Index (SPI) in enrolment
in higher secondary education (grades
XI-XII): Scheduled Castes
Ratio Yearly UDISE NIEPA
Social Parity Index (SPI) in enrolment
in higher secondary education (XIXII): Scheduled Tribes Ratio Yearly UDISE NIEPA
Secondary education graduation rate
(those who enrolled in grade IX in
year t appearing for the Board Exam
in grade X in year t+1)
% Yearly UDISE NIEPA
Higher secondary education
graduation rate by stream (those who
enrolled in grade XI in year t
appearing for the Board Exam in
grade XII in year t+1) (in %)
All Streams Yearly UDISE NIEPA
Arts Yearly UDISE NIEPA
Science Yearly UDISE NIEPA
Commerce Yearly UDISE NIEPA
Learning achievement level of
students in Class X (in scale
scores/mean achievement score)
based on learning achievement survey
English NAS NCERT
Mathematics NAS NCERT
Science NAS NCERT
Social Science NAS NCERT
INTERMEDIATE RESULTS/OUTCOMES
Access and Equity
Enrolment in Secondary Education
(Grades IX and X) by management Number in million Yearly UDISE NIEPA
DRAFT DOCUMENT
193
Project Development Objective (PDO): To achieve increased and more equitable access to good quality education
through support of the Government’s ongoing program for Samagra Shiksha as delineated in its implementation
framework.
Results/Outcomes Indicators Unit of Measure
Base
line
2016-
17
Cumulative Target
Values** Frequency Data Source/ Methodology Responsibility for Data Description (indicator definition etc.) 2017- 18 2018- 19 2019-20
Boys Number in million
Girls Number in million
Transition Rate from Grade VIII to
Grade IX (Enrolment in grade IX in
the year t+1 minus repeaters in grade
IX in the year t +1 as % of the
Enrolment in grade VIII in the year)
% Yearly UDISE NIEPA
All Categories : Boys % Yearly UDISE NIEPA
All Categories : Girls % Yearly UDISE NIEPA
SC: Boys % Yearly UDISE NIEPA
SC: Girls % Yearly UDISE NIEPA
ST : Boys % Yearly UDISE NIEPA
ST : Girls % Yearly UDISE NIEPA
Share of SC in Secondary enrolment
(grades IX-X) (%) % Yearly UDISE NIEPA
Share of ST in Secondary enrolment
(grades IX-X) (%) % Yearly UDISE NIEPA
Share of SC in Higher Secondary
enrolment (grades XI-XII) % Yearly UDISE NIEPA
Share of ST in Higher Secondary
enrolment (grades XI-XII) (%) % Yearly UDISE NIEPA
Quality Input Indicators (Infrastructure, Teachers & TLM Provisions)
Proportion of secondary and higher
schools (taken together) with
basic/core infrastructure and
teaching-learning facilities
%
DRAFT DOCUMENT
194
Project Development Objective (PDO): To achieve increased and more equitable access to good quality education
through support of the Government’s ongoing program for Samagra Shiksha as delineated in its implementation
framework.
Results/Outcomes Indicators Unit of Measure
Base
line
2016-
17
Cumulative Target
Values** Frequency Data Source/ Methodology Responsibility for Data Description (indicator definition etc.) 2017- 18 2018- 19 2019-20
Adequate Pucca Classrooms % Yearly UDISE NIEPA
Urinals (04 or more) % Yearly UDISE NIEPA
Drinking water % Yearly UDISE NIEPA
Separate Headmaster’s Room % Yearly UDISE NIEPA
Office room/ Staffroom % Yearly UDISE NIEPA
Girls’ Activity room % Yearly UDISE NIEPA
Library % Yearly UDISE NIEPA
Integrated Sc. Lab/Science Lab % Yearly UDISE NIEPA
Electricity Connection % Yearly UDISE NIEPA
Internet Connectivity % Yearly UDISE NIEPA
Proportion of secondary and higher
schools (taken together) with
basic/core infrastructure and
teaching-learning facilities by
management
%
 Yearly UDISE NIEPA
Government Yearly UDISE NIEPA
Govt. Aided Yearly UDISE NIEPA
Proportion of secondary
schools/sections with at least the
minimum number of teachers in
position22 as on 30th September
%
 Yearly UDISE NIEPA
Government Yearly UDISE NIEPA
Govt. Aided Yearly UDISE NIEPA
Proportion of secondary Yearly UDISE NIEPA
22 This includes 05 subject teachers plus the headmaster/principal, where ever they are in position. In other cases, 06 teachers in position have been taken into consideration.
DRAFT DOCUMENT
195
Project Development Objective (PDO): To achieve increased and more equitable access to good quality education
through support of the Government’s ongoing program for Samagra Shiksha as delineated in its implementation
framework.
Results/Outcomes Indicators Unit of Measure
Base
line
2016-
17
Cumulative Target
Values** Frequency Data Source/ Methodology Responsibility for Data Description (indicator definition etc.) 2017- 18 2018- 19 2019-20
schools/sections with at least the core
subject teachers in position23 as on
30th September
Government Yearly UDISE NIEPA
Govt. Aided Yearly UDISE NIEPA
23 This includes teachers for Mathematics (01), Science (01), Social Studies (01); Languages (02).
*, **, ***, **** Explained in Annexure-VII
DRAFT DOCUMENT
196
Appendix
COMPONENTS UNDER NEW SCHEME
The major components of the new scheme would be based on the following pattern. The norms for the financial assistance available under the
Scheme have been indicated and the States can supplement/augment the provisions for various interventions from their own resources.
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
I) ACCESS AND RETENTION
1 Opening of New/Upgraded Schools
• New/Upgraded schools from class 1 to 12th
• Preference may be given to composite
schools and consolidation of schools
• Addition of new stream in existing senior
secondary schools
• Preference will be given to Educationally
Backward Blocks (EBBs), LWEs, Special
Focus Districts (SFDs), Border areas and the
115 aspirational districts identified by Niti
Aayog
• As per specified standards and State Schedule of Rates
(SSOR) or CPWD Rates, whichever is lower
• No expenditure under the Programme shall be incurred
on construction of office buildings.
• Assistance for Recurring Expenditure including
manpower deployment in new Upper primary Schools
of up to Rs.10 lakh per school and new Secondary
Schools of up to Rs. 25 lakh per school.
• Assistance for Recurring Expenditure including
manpower deployment in new Senior Secondary
Schools of up to (1) Rs. 40 lakh for one stream; (2) Rs.
55 lakh for 2 streams and (3) Rs. 70 lakh for 3 streams.
Therefore, for each additional stream in an existing
senior secondary school, a recurring financial grant of
Rs. 15 lakh per annum will be provided under the
scheme.
2 Residential Schools/Hostels
• Support for reaching out to children in
sparsely populated, or hilly and densely
forested areas with difficult geographical
terrain and border areas where opening a new
primary or upper primary school and
Secondary/Senior Secondary schools may
• As per SSOR/CPWD Rates, whichever is lower
• As per norms for KGBVs/Girls Hostel
DRAFT DOCUMENT
197
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
not be viable
• Preference will be given to Educationally
Backward Blocks (EBBs), LWEs, Special
Focus Districts (SFDs) and the 115
aspirational districts identified by Niti Aayog
3 Strengthening of Existing Schools
Provision for :
• Science and maths Lab, Computer Room,
Art Cultural Room, Library, ACR, Water
& Toilet, essential classroom furniture,
School infrastructure as per the provisions
in the Schedule of the RTE Act, 2009
• Major Repair, Minor Repair
• Electrification
• Residential Quarters for teachers in
remote and difficult areas
• For a Senior Secondary section/school to
be viable in terms of teachers and other
facilities, it is desirable to have two
sections for each stream, i.e. Science, Arts
& Commerce. A school that offers a
single stream of study, the total number of
students in Grade XI would be 80 (40
students per section) and a maximum of
80 students in Grade XII. Thus, the
maximum number of students in a school
offering a single stream of study would be
160. In a school that offers two streams of
study, the total number of students in
Grade XI would be 160 (four sections)
• As per SSOR/CPWD Rates, whichever is lower
• Electrification will also include Renewable Energy (like
Wind Energy, Hydro Electric energy, Solar Energy etc.)
based on the proposal received from the state after
seeing the viability.
DRAFT DOCUMENT
198
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
and a maximum of 160 students in Grade
XII. In a school that offers three streams
of study, the total number of students in
Grade XI would be 240 (eight sections)
and a maximum of 480 students in Grade
XII if all students enrolled in Grade XI
move to Grade XII.
• Preference will be given to Educationally
Backward Blocks (EBBs), LWEs, Special
Focus Districts (SFDs) and the 115
aspirational districts identified by Niti
Aayog
(Admissibility for Govt. Schools)
4 Transport/Escort Facility
Provision for transport /escort facility for
Children in remote habitations with sparse
population where opening of schools is unviable
or where Gross Access Ratio is low or where
State specific proposal of consolidation of
schools is received.
State would need to notify such habitations and
identify the number of children in that habitation
who would be provided this facility. This would
be appraised based on the data provided by the
State for such children under SDMIS.
(Admissibility for Govt. Schools)
• Transport facility may be provided up to an average cost
@ Rs. 6000/ per child per annum up to Class VIII
• This would be appraised based on actual cost to be
incurred as per the distance, the terrain and the type of
transport facility to be provided.
• The option of Cash transfer will be allowed in the form of
DBT to Aadhar linked bank accounts
II) RTE ENTITLEMENTS
5 Free Uniforms a) To access GoI funds, the State RTE Rules a) Two sets of uniforms for all girls, and children belonging
DRAFT DOCUMENT
199
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
must declare uniform as a child entitlement up
to class VIII
b) These will be appraised based on the data
provided by the State for such children under
SDMIS.
to SC/ST/BPL families’ in Government schools up to
class VIII at an average cost of Rs. 600/- per child per
annum.
b) The option of Cash transfer will be allowed in the form of
DBT to Aadhaar linked bank accounts.
6 Free Textbooks
• State should ensure timely supply of books
before the start of the academic session
• For the purpose, a real time monitoring tool
should be instituted so that there is no delay
in supply of textbooks
• These will be appraised based on the data
provided by the State for such children
under SDMIS.
• Incentive for Reuse of Textbooks
a) Provision for textbooks to all children in
Government/Local Body and Government aided schools,
including Madarsas desirous of introducing the State
curriculum, at an average cost of Rs.250/- per child at
primary level and Rs.400/- per child at upper primary
level.
b) Primers/textbooks developed for tribal languages with
bridging materials to facilitate a transition to the State
language of instruction and English, would be eligible for
textbooks for classes I and II within the ceiling of Rs.
200/- per child.
c) The option of Cash transfer will be allowed in the form of
DBT to Aadhar linked bank accounts.
d) Provision may be made for energized textbooks.
7
Reimbursement towards
expenditure incurred for
25% of admissions under
Section 12 (1) (c), RTE Act.
As per Section 12(1)(c), reimbursement needs to
be provided for admission of EWS students in
neighbourhood private unaided schools.
This reimbursement would be done based on
proof of actual payment to schools by the States.
There should be a transparent system of
admissions and monitoring system for such
admissions.
The reimbursement would be based on per child norms
notified by the State/UTs for classes I to VIII subject to a
maximum ceiling of 20% of the total AWP&B approved by
the GOI for State/UTs under the Programme.
DRAFT DOCUMENT
200
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
These will be appraised based on the data
provided by the State for such children under
SDMIS.
8
Special Training for age
appropriate admission of
out-of-school children
(OoSC) at Elementary
Level
Special Training facility for out-of-school
children to enable a child, admitted to an age
appropriate class, to integrate academically and
emotionally with the rest of the class.
This assistance will be appraised based on an
assessment of the success of the State/UT in
mainstreaming children who have been provided
special training facility. This will be an outcome
based component to incentivize better
performing States.
a) Up to Rs 6,000/- per child per annum for non-residential
courses.
b) Up to Rs20,000/- per child per annum for residential
courses.
Item-wise costs to be worked out to provide adequate
flexibility for the needs of different kinds of children, and
approved by the State Executive Committee of project within
the overall ceiling.
9 Media and Community Mobilization
• Activities to enhance Community
participation and monitoring for universal
access, equity and quality
• Workshops/Lectures/Programmes for
creating Awareness on RTE Act, Learning
Outcomes etc.
• Execution of Media Plans for publicity of the
objectives of the Scheme
• Preparation of related audio-visual, print
material etc.
Up to @Rs 1500 per school for Government Schools subject
to specific plan
10 Training of SMC/SMDC
• Capacity building and Support to
SMCs/SMDCs
Up to @ Rs 3000 per school for Government Schools subject
to a specific plan
III) QUALITY INTERVENTIONS
11 Learning Enhancement Interventions for enhancement of Learning a) Financial Support will be provided under State Specific
DRAFT DOCUMENT
201
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
Programme
(LEP)/Remedial teaching
Outcomes especially for students in areas having
lower performance under the National
Achievement Survey
Developing modules and exemplar material for
teaching-learning, teacher training and
continuous and comprehensive evaluation.
Activities under Padhe Bharat Badhe Bharat
(PBBB) for early grades.
Remedial teaching after identifying students
based on an assessment and post assessment to
be conducted to see outcomes.
(Admissibility for Govt. Schools)
project as per the allocation of flexi fund under quality
subject to viable proposal received from the State/UTs.
b) Remedial teaching programmes/LEP may be provided
for weaker students at a unit cost of uptoRs. 500 per
student after proper identification based on an
assessment.
12 Assessment at National & State level
For assessment of learning levels of children
along with school evaluation, the mode of
assessment would be through NCERT/other
external agency for classes 1 to 12th periodically.
Analysis of assessment results and linkage with
the design of Learning Enhancement
Programmes/Remedial teaching and training of
teachers
Up to @Rs. 10 to 20 lakhs per district depending upon the size
of the districts and states.
13 Composite school Grant
School grant to all Government schools on
annual basis for the replacement of nonfunctional school equipment and for incurring
other recurring costs, such as consumables, play
material, games, sports equipment, laboratories,
Composite Grant (for Government schools)
• There must be transparency in utilization and
provision for social Audit.
• To be spent only by VEC/SMC/SMDC
DRAFT DOCUMENT
202
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
electricity charges, internet, water, teaching aids
etc.
To provide annual maintenance and repair of
existing school building, toilets and other
facilities to upkeep the infrastructure in good
condition.
Promote Swacch Bharat campaign
Must involve elements of community
contribution.
Number of students in
School
School Grant *
≤ 100 Rs. 25000/-(including at-leastRs
2500 for swachhta action plan).
>100 to ≤ 250 Rs. 50,000/- (including at-leastRs.
5000 for swachhta action plan).
> 250 to ≤ 1000 Rs. 75,000/- (including at-leastRs
7500 for swachhta action plan).
> 1000 Rs. 100,000/-(including atleastRs. 10000 for swachhta
action plan).
14 Libraries
In order to complement the activities under
Padhe Bharat Badhe Bharat and inculcate the
reading habits among students of all ages,
strengthening of school libraries including
purchase of books
Must involve elements of community
contribution
(Admissibility for Govt. Schools)
a) Up to @ Rs. 5,000/- for primary school and Rs.10,000/-
for upper primary school.
b) Up to @ Rs. 13,000/- for composite elementary schools
(Class I to VIII)
c) Up to @ Rs. 10,000/- for Secondary schools (Classes 9th
and 10th).
d) Up to @ Rs. 15,000/- for class 6th to 12th
e) Up to @ Rs. 15,000/- for composite Secondary Schools
(class 1 to 10th)
f) Up to @ Rs. 15,000/- for composite Secondary Schools
(class 9th to 12th)
g) Up to @ Rs. Rs.10,000/- Senior Secondary school only
(class 11 to 12th).
h) Up to @ Rs. 20,000/- for composite Senior Secondary
school (class 1 to 12th).
DRAFT DOCUMENT
203
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
i) These grants will be available on an annual basis.
15 RastriyaAvishkarAbhiyan (RAA)
To promote Science and Maths learning at upper
primary to Senior Secondary (for classes VI to
XII) as per the guidelines of RAA
Depends upon the State specific proposal which would include
Science and Maths kits, Science and Maths fair/exhibitions,
capacity building of Science and Maths Teachers, exposure
visits, mentoring by higher educational institutions etc.
16 ICT and Digital Initiatives
The component will cover classes VI to XII.
Flexibility to procure hardware such as tablets /
laptops / notebooks / integrated teaching learning
devices and open source operating system as well
as Hardware, Software, training and resource
support. This would include support for digital
boards, smart classrooms, virtual classrooms and
DTH channels on pro-rata basis for number of
schools approved.
Priority will be given to projects which have an
element of community participation
(Admissibility for Govt. Schools)
For schools having classes 6 to 12, a non-recurring grant of up
to Rs. 6.40 lakh per school and recurring grant of upto Rs.
2.40 lakh per school per annum for a period of 5 years.
17 Innovation
Flexible funds for innovation
State Specific Projects for improvement of
Quality and access of Education.
Activities like Ek Bharat Shreshta Bharat, Kala
Utsav, Yoga Olympiad, Band competitions etc.
Financial Support will be provided under State Specific
project as per the allocation of flexi fund under quality to the
state subject to viable proposal received from the State/UTs.
18. Other Quality Initiatives
Guidance and counselling services for schools
Aptitude Tests
Exposure to Vocational Skills at Upper Primary
Financial Support will be provided under State Specific
project as per the allocation of flexi fund under quality to the
state subject to viable proposal received from the State/UTs.
DRAFT DOCUMENT
204
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
Level
19. Support at Pre-school level
At pre-school level support for training of
Anganwadi workers for pre-school education in
line with the NCERT Framework, co-location of
Anganwadis in Primary Schools and curriculum
development in convergence with
Ministry/Department of Women and Child
Development can be provided.
Support the efforts of State Government in
setting up pre-school schools
(Admissibility for Govt. Schools)
Based on State-specific proposal
Recurring Grant, including manpower deployment, of upto Rs
2 lakh per school and non-recurring grant of upto Rs 1 lakh
per school.
IV) SALARY OF TEACHERS
20 Teacher Salary (HMs/Teachers)
Teachers will be recruited as per the terms and
conditions of the respective States/UTs
Salary Structure will be determined by the
State norms for salaries.
The entitlement would be determined after an
assessment of the requirement of the posts and
adequate deployment of teachers a per the PTR
norms. This will be based on the data provided
by the State for teachers under
UDISE/ShaalaKosh and DIKSHA.
There will be no separate cadre of teachers
sanctioned by the Centre. All teachers are
ultimately the responsibility of the State
Salary Structure will be determined by the State norms for
salaries. The Central share under the Scheme for
teachers’ salaries will be restricted as per the prevalent
fund sharing pattern based on the financial norms given
below:
a. Primary Teachers: up to Rs. 15000 per month
b. Upper Primary teachers : up to Rs. 20000 per month
c. For secondary teachers : upto Rs.25,000 per month
d. Head Teachers: up to Rs. 25000 per month
e. Head Master/Principal: up to Rs. 30000/- per month
f. Part time teachers (for Arts, Physical & Health
Education & Work education): up to Rs. 7000 per
month
In case of a composite school, the Head Teacher of the senior
DRAFT DOCUMENT
205
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
Government.
Teachers will be adequately deployed to ensure
that all schools follow the PTR norms.
most level will be in-charge of the whole school.
V) GENDER AND EQUITY
21 Kasturba Gandhi BalikaVidyalaya (KGBV)
KGBVs to be extended up to Class 12th for
smooth transition of girls from Elementary to
Senior Secondary.
Priority will be given for up-gradation of KGBV
where the Girls’ Hostel has been established in
the same campus and there is no
secondary/Senior Secondary school in the
vicinity.
For building as per SSOR/CPWD rates, whichever is lower
A recurring grant would be provided as below to account for
all expenses including manpower cost:
(i) for KGBVs for classes VI to VIII of upto Rs 60
lakh per annum
(ii) for KGBVs for classes VI to X of upto Rs 80 lakh
per annum
(iii) for KGBVs for classes VI to XII of upto Rs 1 crore
per annum
(iv) for existing Stand-alone Girls’ Hostels for classes
IX to XII of upto Rs 25 lakh
22 Self Defence training for Girls
Training for 3 months for inculcating self
defence skills including life skill for self
protection and self-development.
(Admissibility for Govt. Schools)
Provision for upto Rs. 3000 per month for 3 months per school
for schools having classes VI to XII.
23 Special projects for equity
Special state specific projects for enhancing
access, retention and quality such as enrolment
drives, retention and motivation camps, gender
sensitisation modules etc.
Financial Support will be provided under State Specific
project as per the allocation of flexi fund under quality to the
state subject to viable proposal received from the State/UTs.
VI) INCLUSIVE EDUCATION
24 Provision for children with special needs (CWSN) a) The key thrust of Programme will be on providing inclusive education to all children with special needs in general schools. i. Provision of up to Rs. 3500 per child, per year for children with special needs, studying in government, government aided and local body schools as per specific
DRAFT DOCUMENT
206
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
Funding will be based on data of CWSN
provided under SDMIS.
b) Programme will also support special training,
education through open learning system,
home schooling, wherever necessary,
itinerant teaching, remedial teaching,
community based rehabilitation (CBR) and
vocational education.
proposal. This will include aids and appliances, teaching
material, stipend for CWSN girls @ Rs. 200 per month
for 10 months.
ii. Provision of special educators at cluster/school level as per
requirement and financial norms as per para 20 above.
VII) VOCATIONAL EDUCATION
25
Introduction of Vocational
Education at Secondary
and Senior Secondary
•Vocational Education to be introduced as an
integral part of general education at
Secondary and Senior Secondary level as per
guidelines of vocational education scheme. The
vocational subjects are to be introduced as an
additional subject at the secondary level and as
compulsory (elective) at the Senior Secondary
level.
•Under the program, there is a provision for
arranging hands on training for students in
industrial set up and guest lectures from
industry. On-job training may be provided
during vacations for at least 80 hours in a job
role.
•One/Two job roles may be covered in the span
of 4 years based on content and notional hours.
First job role may be completed in classes 9-10
and the other in classes 11-12. Further, some
job roles which require longer duration of
training will be completed in 4 years.
Non Recurring
• Construction of Workshop/laboratory cum Class room @
State Schedule of Rate (SSOR) as per requirement of
States/UTs
• UptoRs. 5.0 lakh per school per job role for Tools &
Equipment including Furniture, Computers, etc.
Recurring
Components
Composite
schools
(Classes IX –
XII)
NonComposite
schools
((Classes IX –
X) / (XI - XII))
Financial support for One
vocational teacher/trainer
per job role (@ Rs. 20,000 -
25,000/- per month)
12.00 6.00
DRAFT DOCUMENT
207
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
•One time non-recurring grant for purchase of
tools and equipments may be approved at the
time of introduction of new job roles.
•External assessment with the involvement of
SSC may be taken up only at the end of classes
10 and 12. The States/UTs need to follow the
assessment timeline. In classes 9 and 11, the
practical assessment may be done at the
State/UT by interchanging the teachers/trainers
amongst different schools for the purpose of
assessment. The assessment and certification
cost of Rs. 600 per student may be approved for
40 students per class per job role in classes 10
and 12.
•The scheme will cover Government schools.
Government aided schools, in those States/UTs
where Govt. Schools have already been covered
under the Scheme, may also be considered for
financial Assistance as per the norms of the
scheme.
•Ministry of Skill Development has notified
certain common norms for all skill
development schemes. However these norms
will not be applicable to vocationalisation
component which seeks to integrate
vocational education with general
curriculum in schools, funding and
placement related norms are not applicable
to school education, as objective is to
Provision for financial
support for engaging
resource persons including
Skill Knowledge Providers,
Coordinators, guest faculty
including skilled, semiskilled rural artisans and
crafts persons and
administrative cost for
VTPs, cost for assessment
and selection of VTs
uptoRs. 1000 per VT etc.
2.50 1.25
Raw Materials,
maintenance of tools and
equipments purchase of
books, software, e- learning
material etc.
4.50 2.25
Cost of providing hands on
skill training/on the job
training to students
2.40 1.20
Cost of Assessment and
Certification @ Rs. 600/-
for Class X and XII
0.96 0.48
Office Expenses/
Contingencies (including
expenditure on awareness &
publicity, guidance and
counselling, transport, field
visits,
2.00 2.00
DRAFT DOCUMENT
208
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
enhance employability and reduce drop-outs
and not only employment.
• Induction Training of 10 days and In-service training of 05
days for Teachers/Skill Trainers including re-training of
existing vocational trainers in relevant job roles @ Rs. 300-
500 per day per trainee
VIII) SPORTS AND PHYSICAL EDUCATION
26 SPORTS AND PHYSICAL EDUCATION
The sports equipment will be provide under this
component. Expenditure for meeting expenses on
procuring sports equipment for indoor & outdoor
games in convergence with Department of
Sports.
(Admissibility for Govt. Schools)
Up to Rs.5,000 for Primary school
Up to Rs.10,000 for upper primary
Up to Rs.25, 000 for Secondary and Senior Secondary
IX) STRENGTHENING OF TEACHER EDUCATION
27.
Strengthening of physical
infrastructure &
Establishment of New
DIETs
For lecture halls, seminar rooms, hostel facilities,
repairs and renovations, etc. include “renovation
of buildings, expansion and modernisation”.
Establishment of Special Cells: Laboratories for
Science, Mathematics, Social Studies,
Educational Technology, Computer & Language,
English education.
Establishment of New DIET* in the plan
period: The existing norm of establishing
DIETs in all districts created up to March,
2011, will be modified to include new districts
created upto 31st March, 2017.
Civil Work:
 As per State SOR or CPWD and Rs 20.00 lakh for
Equipment (Non-recurring)
 Establishment of Special Cells for SCERT (One time
Grant) : UptoRs.50.00 lakh per SCERT/SIE (10 lakhs per
Special Cell) (Non-recurring)
 Establishment of New DIET* in the plan period: As per
State SOR or CPWD Rs 20.00 lakh for Equipment (Nonrecurring)
28. Salaries* of Teacher Educators (TEIs)
*Central support for salary of Teacher Educators
is proposed to be restricted to 70% of the filled
up posts and 60% of the filled up posts for the
year 2018-19 and 2019-20, respectively.
*Salaries of faculty and staff of SCERT in
As per actual (Recurring /year). *Central support for salary
of Teacher Educators is proposed to be restricted to 70% of the
filled up posts and 60% of the filled up posts for the year
2018-19 and 2019-20, respectively.
DRAFT DOCUMENT
209
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
respect of additional posts sanctioned and filled
up after the introduction of the revised scheme
(2012) by adoption/adaption of the suggested
organizational structure of SCERT.
*Posts sanctioned and filled up after upgradation.
**CTEs and IASEs come under the jurisdiction
of Department of Higher Education in the
States and have not been able to contribute
effectively towards the objectives of the
CSSTE. It is proposed to phase-out the salary
support to them after the completion of 14th
Finance Commission period. However,
programmatic support may continue.
29.
Training for In-service
Teacher, Head Teachers
and Teacher Educators
To emphasize the integration of training
structures in States, the funds for teachers’
training would be implemented through SCERTs
who will be the nodal agency in the State to
conduct in-service teachers’ training. This may
be done in close coordination with CTEs and
IASEs.
Training for In-service Teacher
Project will provide training support as per the following
norms:
For Teachers:
a) Refresher In-service training upto 10 days for all teachers
@ Rs300-500/- per teacher per day.
b) Residential Induction training for newly recruited teachers
for 30 days up to @ Rs300-500/- per day.
For Head Teachers:
a) Refresher residential in-service training of 10 days for all
teachers each year at BRC level and above up to @300-
500 per teacher per day.
b) Head Master/Principal for Leadership Training through
DRAFT DOCUMENT
210
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
NIEPA/State Leadership Academy up to @ Rs.4800/- per
Head Master/Principal per year.
For Resource Persons:
Refresher training for all Resource Persons, Master Trainers,
BRC and CRC faculty and coordinators for upto10 days up to
@ Rs300-500/- per person per day.
Training of Educational Administrators
Residential State level Training of upto 5 days for Educational
administrators @ uptoRs 1000 per person per day
Training for Teacher Educators
Residential Training upto 10 days Orientation/ Induction
Training of Teacher Educators (SCERTs):
Rs. 300-500 per participant per day upto 10 days
Training of DIET Faculty as Master Trainers’ (SCERTs)
Up to @ Rs.4800/- per DIET faculty per year.
 (Recurring /year).
30. DIKSHA (National Teacher Platform)
Software development/maintenance for
DIKSHA, setting-up of project team, creation,
curation and translation of digital content,
capacity building, awareness and
communication drive etc
As per State-Specific proposal
31
Program & Activities and
Specific projects for
Research activities (DIETs)
Funds for programme and activity and specific
project for research
 Upto Rs. 40.00 lakh per DIET for Program activities
(Recurring /year)
 Upto Rs. 10.00 lakh per DIET for Specific projects for
Research activities(Recurring /year)
32. Technology Support to The component will cover all SCERT, DIET &  Non-recurring cost of Rs. 6.40 lakh (For Hardware
DRAFT DOCUMENT
211
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
TEIs BITE. Flexibility to procure hardware such as
tablets / laptops / notebooks / integrated
teaching learning devices and open source
operating system as well as Hardware,
Software, training and resource support. This
would include support for smart classrooms,
virtual classrooms, digital boards and DTH
channels
Support) per SCERT, DIET and BITE
 Recurring cost of upto Rs. 2.40 lakh per annum for a
period of 5 years per SCERT, DIET and BITE
33. Annual Grant for TEIs
Annual grant of SCERT,DIET and BITE per
year to meet day-to-day expenses, hiring of
Resource persons/Experts for Teacher Training,
purchase of library books/periodicals, small
office/library equipment’s, stationary, office
expenses,etc.
 SCERT: Upto Rs. 35.00 lakh per SCERT/SIE (Recurring
/year)
 DIET: UptoRs. 20.00 lakh per DIET (Recurring /year)
 BITE: UptoRs 5.00 lakh BITE (Recurring /year)
34. Academic support through BRC/URC/CRC
a) BRCs/URCs and CRCs are the most critical
units for providing training and on-site
support to schools and teachers. Given the
significance of these structures, the
programme will strengthen the faculty and
infrastructure support to BRC/URC and
CRCs.
b) States must focus on improved selection
criteria for the coordinators and faculty of
BRC/URC and CRCs. The selection
criteria should take into consideration
their experience, qualifications and
aptitude for training and research, and
should follow an objective assessment of
the same. BRC/URC Coordinator and
Project will provide support for BRC/URC and CRC as per the
following norms:
For BRC/URC:
a) There would ordinarily be one BRC in each Community
Development (CD) Block. In states, where the sub-district
educational administrative structure like educational
blocks or circles have jurisdictions which are not coterminus with the CD Blocks, the State may opt for a BRC
in each such sub-district educational administrative units.
However, in such a case the overall recurring and nonrecurring expenditure on BRCs in a CD Block, should not
exceed the overall expenditure that would have been
incurred had only one BRC per CD Block been opened.
DRAFT DOCUMENT
212
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
faculty should be professionally qualified,
and have at least five years teaching
experience
c) States must provide for constant skill
enhancement of BRC/URC and CRC
coordinators and faculty
d) Functional linkage between BRC/URCs
and CRCs with DIETs and district level
resource groups should be strengthened.
e) BRCs and CRCs will support the entire
schooling system i.e., classes 1-12
f) In urban areas, academic resource centres
would be set up on the lines of BRC to
cover 10-15 CRCs. If the municipality or
town development authority has academic
staff, they may be deployed in the URCs.
g) On an average, one CRC Coordinator may be
placed in charge of upto 18 schools in a
block.
b) The following resource support may be provided for
BRC/URC:
i. Six Resource persons for subject specific teaching
ii. Two Resource Persons for Inclusive Education for
children with special needs.
iii. One MIS Coordinator and one Data Entry Operator
iv. One Accountant-cum-support staff per 50 schools to be
appointed on contract basis. These accountants will be
mobile and provide support to schools and block to
help them maintain their record properly.
v. Additional grant of up to Rs 5 lakh per annum for
expanding the support to secondary level. This may
include deployment of additional Resource Persons,
and recurring expenditure for strengthening the
BRC/URC
c) BRC/URC may be located in school campuses as far as
possible. Construction will be as per the State Schedule of
Rates (SSoR)/CPWD rates, whichever is lower.
d) Provision for BRCs/URCs up to Rs 5 lakh for furniture,
computer, TLE/TLM, recurring expenditure, meetings,
contingencies etc.
e) CRC construction cost will be as per schedule of Rates
notified by the State for additional classroom. The CRC
may be used as an additional classroom in schools on days
when CRC meetings are not held.
Provisions for CRCs up to Rs 2 lakh for furniture, computer,
TLE/TLM, recurring expenditure, meetings, contingencies
etc.
DRAFT DOCUMENT
213
Sl.
No.
Activities Programmatic Norms Financial Norms
(The Central share under the Scheme will be restricted as
per the prevalent fund sharing pattern based on the
financial norms given herein)
X) MONITORING OF THE SCHEME
35 Monitoring Information Systems (MIS) Support to States for various MIS of the Department like UDISE, ShaalaKosh, Shagun etc. Assistance up to Rs. 2 per student as per the total enrolment reflected in SDMIS
XI) NATIONAL COMPONENT
36.
Support to central
institutions like NIEPA,
NCERT, NCPCR//TSG/
NIC etc.
(i) Support to National Institutions like NIEPA,
NCERT, PSSCIVE, NCPCR, NIC etc. for
National level programmes related to quality of
education, assessments, data management, and
digital education, Swacch Vidyalaya Puraskar
etc.
(ii) Technical Support Group for monitoring of
the Scheme
Up to 1% of the Budget Outlay
37.
Establishment of National
Institute of Teacher
Education (NITE)
Recurring and non-recurring support to NITE As per CPWD rates for non-recurring and as per actual
requirement for recurring.
XII) PROGRAMME MANAGEMENT
38. Management Cost Support States in implementing the Project The Management costs shall not exceed 3.5-5% of the State Outlay
Note: Procurement of goods should preferably be done from Government e-marketplace (GeM) portal. 

"""

# Create the Flask app
app = Flask(__name__)

# Function to get responses from the Gemini model
def get_chatbot_response(user_input):
    prompt = chatbot_prompt + "\nUser: " + user_input + "\nEduBot:"
    response = model.generate_content(prompt)
    return response.text

# Define a route for the chatbot
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    if not data or "query" not in data:
        return jsonify({"error": "Invalid request. Please provide a 'query' field."}), 400
    
    user_input = data["query"]
    response = get_chatbot_response(user_input)
    return jsonify({"response": response.strip()})

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
