#SET YOUR WORKING DIRECTORY WITH setwd()

library(magrittr)
library(dplyr)

#LOAD DATA
data <- read.csv('players_20.csv',fill = TRUE)
summary(data)

#HIGH POTENTIAL FORWARDS
high_potential_forwards = data %>% filter((potential>overall) & (overall>=65) & (potential-overall >=5)) %>% filter(team_position == "LW" | team_position =="RW" | team_position=="RS" | team_position=="LS" | team_position=="ST" | team_position=="CF") %>% select(-body_type,-long_name,-dob,-international_reputation,-real_face,-nation_position,-nation_jersey_number,-ls,-st,-rs,-lw,-lf,-cf,-rf,-rw,-lam,-cam,-ram,-lm,-lcm,-cm,-rcm,-rm,-lwb,-rwb,-ldm,-cdm,-rdm,-lb,-lcb,-cb,-rcb,-rb,-gk_diving,-gk_handling,-gk_kicking,gk_reflexes,-gk_speed,-gk_positioning,-goalkeeping_diving,-goalkeeping_handling,-goalkeeping_kicking,-goalkeeping_positioning,-goalkeeping_reflexes)
write.csv(high_potential_forwards,"high_potential_forwards.csv")

#HIGH POTENTIAL MIDFIELDERS
high_potential_midfielders = data %>% filter((potential>overall) & (overall>=65) & (potential-overall >=5)) %>% filter(team_position == "LM" | team_position =="RM" | team_position=="RCM" | team_position=="LCM" | team_position=="CM" | team_position=="CDM" | team_position=="LDM" | team_position=="RDM" ) %>% select(-body_type,-long_name,-dob,-international_reputation,-real_face,-nation_position,-nation_jersey_number,-ls,-st,-rs,-lw,-lf,-cf,-rf,-rw,-lam,-cam,-ram,-lm,-lcm,-cm,-rcm,-rm,-lwb,-rwb,-ldm,-cdm,-rdm,-lb,-lcb,-cb,-rcb,-rb,-gk_diving,-gk_handling,-gk_kicking,gk_reflexes,-gk_speed,-gk_positioning,-goalkeeping_diving,-goalkeeping_handling,-goalkeeping_kicking,-goalkeeping_positioning,-goalkeeping_reflexes)
write.csv(high_potential_midfielders,"high_potential_midfielders.csv")

#HIGH POTENTIAL DEFENDERS
high_potential_defenders = data %>% filter((potential>overall) & (overall>=65) & (potential-overall >=5)) %>% filter(team_position == "CB" | team_position =="RCB" | team_position=="LCB" | team_position=="LB" | team_position=="RB" | team_position=="LWB" | team_position=="RWB" ) %>% select(-body_type,-long_name,-dob,-international_reputation,-real_face,-nation_position,-nation_jersey_number,-ls,-st,-rs,-lw,-lf,-cf,-rf,-rw,-lam,-cam,-ram,-lm,-lcm,-cm,-rcm,-rm,-lwb,-rwb,-ldm,-cdm,-rdm,-lb,-lcb,-cb,-rcb,-rb,-gk_diving,-gk_handling,-gk_kicking,gk_reflexes,-gk_speed,-gk_positioning,-goalkeeping_diving,-goalkeeping_handling,-goalkeeping_kicking,-goalkeeping_positioning,-goalkeeping_reflexes)
write.csv(high_potential_defenders,"high_potential_defenders.csv")

#ALL HIGH POTENTIAL PLAYERS
high_potential_players = data %>% filter((potential>overall) & (overall>=55)  & (potential-overall >=15)) %>% select(-body_type,-long_name,-dob,-international_reputation,-real_face,-nation_position,-nation_jersey_number,-ls,-st,-rs,-lw,-lf,-cf,-rf,-rw,-lam,-cam,-ram,-lm,-lcm,-cm,-rcm,-rm,-lwb,-rwb,-ldm,-cdm,-rdm,-lb,-lcb,-cb,-rcb,-rb)
write.csv(high_potential_players,"high_potential_players.csv")