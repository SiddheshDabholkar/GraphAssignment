We have attached mock JSON data that contains all the customer scheduling information,
each row represents 1 scheduled and contains 3 fields:
Schedule time - The time at which meal was scheduled by the customer
Slot - There are two slots for which any item can be scheduled, the possible values for the
slot are: L and D representing lunch and dinner respectively.
Item date - Represents the date for which the item is to be delivered.
We are interested to understand the customer scheduling patterns. For this assignment,
create a graph that accepts item_date value based on which it aggregates the scheduling
date and time for the item_date.
For instance, I can select 21st November, and the graph may display:
20th November: 5 Scheduled
19th November: 2 Scheduled
18th November: 2 Scheduled
Each date can further be expanded to display the time. For instance, if I click 20th November
then I can see:
9am to 12am -> 2 Scheduled
12am to 3pm -> 1 Scheduled
3pm to 6pm -> 0 Scheduled
6pm to 9pm -> 2 Scheduled
and so on, you can use any type of graph(or even two graphs) for this.
You're free to use any libraries to accomplish this task. Feel free to be creative with the data
organisation and the design. We use react (typescript), redux and SCSS for the front-end.
Bonus (not required):
Add an additional graph that aggregates data to calculate the prior scheduling time for any
given period. For example, if I select dates from 21st November to 30th November then a
graph displays information such as:
75% of scheduling done 1 day prior
10% of scheduling was done 2 days prior
and so on.
