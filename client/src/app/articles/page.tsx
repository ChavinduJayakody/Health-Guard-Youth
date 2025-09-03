"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, User, ArrowRight, Heart, Droplets, Activity, BookOpen, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const articles = [
  {
    id: 1,
    title: "Understanding Type 2 Diabetes: A Comprehensive Guide for Sri Lankan Youth",
    excerpt:
      "Type 2 diabetes is becoming increasingly common among young adults in Sri Lanka. This comprehensive guide covers everything you need to know about prevention, early detection, and management strategies specifically tailored for the Sri Lankan lifestyle and dietary habits.",
    content: `
# Understanding Type 2 Diabetes: A Comprehensive Guide for Sri Lankan Youth

Type 2 diabetes has become a significant health concern among Sri Lankan youth, with rates increasing dramatically over the past decade. Unlike Type 1 diabetes, which is typically diagnosed in childhood, Type 2 diabetes often develops in adulthood but is increasingly affecting younger populations.

## What is Type 2 Diabetes?

Type 2 diabetes occurs when your body becomes resistant to insulin or doesn't produce enough insulin to maintain normal glucose levels. Insulin is a hormone that helps glucose enter your cells to be used for energy. When this process doesn't work properly, glucose builds up in your bloodstream.

## Risk Factors Specific to Sri Lankan Youth

### Genetic Predisposition
South Asians, including Sri Lankans, have a higher genetic predisposition to developing diabetes. Research shows that Sri Lankans can develop diabetes at lower BMI levels compared to other ethnic groups.

### Dietary Factors
- **High Rice Consumption**: The traditional Sri Lankan diet is rice-heavy, which can lead to rapid spikes in blood sugar
- **Processed Foods**: Increasing consumption of processed snacks, sugary drinks, and fast food
- **Coconut Oil and Saturated Fats**: While coconut oil has benefits, excessive consumption can contribute to insulin resistance

### Lifestyle Changes
- **Sedentary Lifestyle**: Increased screen time and reduced physical activity
- **Stress**: Academic and career pressures leading to chronic stress
- **Sleep Patterns**: Irregular sleep schedules affecting hormone regulation

## Early Warning Signs

Watch out for these symptoms:
- Increased thirst and frequent urination
- Unexplained weight loss or gain
- Fatigue and weakness
- Blurred vision
- Slow-healing cuts or infections
- Tingling in hands or feet

## Prevention Strategies

### Dietary Modifications
1. **Portion Control**: Use smaller plates and practice mindful eating
2. **Choose Brown Rice**: Replace white rice with brown rice or other whole grains
3. **Increase Fiber**: Include more vegetables, fruits, and legumes
4. **Limit Sugary Drinks**: Replace soft drinks with water, herbal teas, or fresh lime juice
5. **Traditional Healthy Foods**: Embrace traditional Sri Lankan foods like green leafy vegetables, fish, and spices like turmeric and cinnamon

### Physical Activity
- Aim for at least 150 minutes of moderate exercise per week
- Include both aerobic exercise and strength training
- Try traditional activities like dancing, cricket, or swimming
- Take regular walks, especially after meals

### Stress Management
- Practice meditation or mindfulness
- Maintain social connections
- Pursue hobbies and interests
- Seek support when needed

## Regular Screening

Young adults should consider diabetes screening if they have:
- Family history of diabetes
- BMI over 23 (lower threshold for South Asians)
- High blood pressure
- PCOS (for women)
- Previous gestational diabetes

## When to Seek Medical Help

Consult a healthcare provider immediately if you experience:
- Persistent symptoms mentioned above
- Family history of diabetes and you're over 25
- BMI over 25 with additional risk factors
- Abnormal results from health screenings

## Living with Prediabetes

If diagnosed with prediabetes, you can still prevent or delay Type 2 diabetes:
- Follow a structured lifestyle modification program
- Regular monitoring of blood glucose levels
- Work with a nutritionist familiar with Sri Lankan cuisine
- Join support groups or diabetes prevention programs

## Conclusion

Type 2 diabetes is largely preventable through lifestyle modifications. By understanding your risk factors and taking proactive steps, you can significantly reduce your chances of developing this condition. Remember, small changes in diet and lifestyle can make a big difference in your long-term health.

*Always consult with healthcare professionals for personalized advice and treatment plans.*
    `,
    author: "Dr. Samantha Perera, MD",
    authorBio: "Endocrinologist at National Hospital of Sri Lanka with 15 years of experience in diabetes care",
    date: "2024-01-15",
    category: "Diabetes",
    readTime: "12 min read",
    image: "/diabetes-awareness-young-adults.png",
    tags: ["Diabetes", "Prevention", "Youth Health", "Sri Lankan Diet"],
    views: 2847,
    likes: 156,
  },
  {
    id: 2,
    title: "Heart Health in Your 20s: Building Lifelong Cardiovascular Wellness",
    excerpt:
      "Your twenties are crucial for establishing heart-healthy habits that will benefit you throughout life. Learn about cardiovascular risk factors, prevention strategies, and how to maintain optimal heart health as a young adult in Sri Lanka.",
    content: `
# Heart Health in Your 20s: Building Lifelong Cardiovascular Wellness

Cardiovascular disease is the leading cause of death globally, and Sri Lanka has one of the highest rates of heart disease in South Asia. However, the foundation for heart health is built in your twenties, making this decade crucial for establishing lifelong healthy habits.

## Understanding Cardiovascular Health

Your cardiovascular system includes your heart and blood vessels. A healthy cardiovascular system efficiently pumps blood throughout your body, delivering oxygen and nutrients to all organs and tissues.

## Risk Factors for Young Adults

### Non-Modifiable Risk Factors
- **Family History**: Genetic predisposition to heart disease
- **Age and Gender**: Risk increases with age; men typically develop heart disease earlier
- **Ethnicity**: South Asians have higher risk at younger ages

### Modifiable Risk Factors
- **High Blood Pressure**: Often called the "silent killer"
- **High Cholesterol**: Particularly LDL (bad) cholesterol
- **Smoking**: Even occasional smoking significantly increases risk
- **Diabetes**: Doubles the risk of heart disease
- **Obesity**: Especially abdominal obesity
- **Physical Inactivity**: Sedentary lifestyle
- **Poor Diet**: High in saturated fats, trans fats, and sodium
- **Excessive Alcohol**: More than moderate consumption
- **Chronic Stress**: Ongoing stress affects heart health
- **Poor Sleep**: Less than 7 hours or poor quality sleep

## The Sri Lankan Context

### Traditional Diet Benefits
- **Fish**: Rich in omega-3 fatty acids
- **Spices**: Turmeric, garlic, and ginger have anti-inflammatory properties
- **Coconut**: Contains medium-chain fatty acids
- **Vegetables**: High in antioxidants and fiber

### Modern Challenges
- **Increased Salt Intake**: Processed foods and restaurant meals
- **Trans Fats**: Found in many packaged snacks and fried foods
- **Reduced Physical Activity**: Urban lifestyle changes
- **Stress**: Economic and social pressures

## Building Heart-Healthy Habits

### Nutrition Guidelines

#### Foods to Embrace
1. **Fish**: Aim for 2-3 servings per week, especially fatty fish like salmon, mackerel, or tuna
2. **Fruits and Vegetables**: At least 5 servings daily, focus on colorful varieties
3. **Whole Grains**: Brown rice, whole wheat bread, oats
4. **Legumes**: Lentils, chickpeas, beans
5. **Nuts and Seeds**: Almonds, walnuts, flaxseeds
6. **Healthy Oils**: Olive oil, avocado oil in moderation

#### Foods to Limit
1. **Processed Meats**: Sausages, bacon, processed chicken
2. **Sugary Drinks**: Soft drinks, energy drinks, sweetened teas
3. **Refined Carbohydrates**: White rice, white bread, pastries
4. **Trans Fats**: Margarine, packaged snacks, fried foods
5. **Excessive Salt**: Limit to less than 2,300mg per day

### Physical Activity Recommendations

#### Aerobic Exercise
- **Moderate Intensity**: 150 minutes per week (brisk walking, swimming, cycling)
- **Vigorous Intensity**: 75 minutes per week (running, high-intensity sports)
- **Daily Activity**: Take stairs, walk during breaks, park farther away

#### Strength Training
- At least 2 days per week
- Work all major muscle groups
- Can include bodyweight exercises, resistance bands, or weights

#### Flexibility and Balance
- Yoga or stretching routines
- Helps with stress management and overall fitness

### Stress Management

#### Techniques
1. **Meditation**: Even 10 minutes daily can help
2. **Deep Breathing**: Practice during stressful moments
3. **Regular Exercise**: Natural stress reliever
4. **Social Support**: Maintain strong relationships
5. **Hobbies**: Engage in activities you enjoy
6. **Professional Help**: Don't hesitate to seek counseling

### Sleep Hygiene

#### Tips for Better Sleep
- Maintain consistent sleep schedule
- Create a relaxing bedtime routine
- Limit screen time before bed
- Keep bedroom cool, dark, and quiet
- Avoid caffeine late in the day
- Limit alcohol consumption

## Regular Health Monitoring

### Key Measurements
- **Blood Pressure**: Should be less than 120/80 mmHg
- **Cholesterol Levels**: Total cholesterol less than 200 mg/dL
- **Blood Sugar**: Fasting glucose less than 100 mg/dL
- **BMI**: Maintain healthy weight (18.5-24.9 for most people)
- **Waist Circumference**: Less than 35 inches for women, 40 inches for men

### Screening Schedule
- **Annual Check-ups**: Basic health assessment
- **Blood Pressure**: At least every 2 years if normal
- **Cholesterol**: Every 4-6 years starting at age 20
- **Diabetes**: Every 3 years starting at age 45, or earlier if risk factors present

## Warning Signs to Watch For

Seek immediate medical attention for:
- Chest pain or discomfort
- Shortness of breath
- Pain in arms, back, neck, jaw, or stomach
- Sudden dizziness or fainting
- Severe headache
- Leg pain or swelling

## Creating Your Heart-Healthy Action Plan

### Week 1-2: Assessment
- Get baseline health measurements
- Track current diet and activity levels
- Identify personal risk factors

### Week 3-4: Small Changes
- Add one extra serving of vegetables daily
- Take a 10-minute walk after lunch
- Replace one sugary drink with water

### Month 2: Build Habits
- Establish regular exercise routine
- Plan heart-healthy meals
- Practice stress management techniques

### Month 3 and Beyond: Maintain and Improve
- Regular health check-ups
- Adjust goals as needed
- Celebrate progress and stay motivated

## Conclusion

Your twenties are the perfect time to invest in your heart health. The habits you build now will pay dividends throughout your life. Remember, small consistent changes are more effective than dramatic short-term efforts. Start with one or two changes and gradually build a heart-healthy lifestyle.

*Consult with healthcare professionals before starting any new exercise program or making significant dietary changes.*
    `,
    author: "Dr. Rohan Fernando, MD",
    authorBio: "Cardiologist at Sri Jayewardenepura General Hospital, specializing in preventive cardiology",
    date: "2024-01-12",
    category: "Heart Health",
    readTime: "15 min read",
    image: "/heart-health-young-people-exercise.png",
    tags: ["Heart Health", "Lifestyle", "Prevention", "Exercise"],
    views: 1923,
    likes: 134,
  },
  {
    id: 3,
    title: "The Sri Lankan Diet: Balancing Tradition with Modern Health Needs",
    excerpt:
      "Discover how to maintain your cultural food traditions while making healthier choices. This guide explores traditional Sri Lankan foods that promote health and provides practical tips for modernizing classic recipes without losing their authentic flavors.",
    content: `
# The Sri Lankan Diet: Balancing Tradition with Modern Health Needs

Sri Lankan cuisine is rich in flavors, spices, and cultural significance. However, modern lifestyle changes and food processing have altered traditional eating patterns, sometimes negatively impacting health. This guide helps you maintain cultural food traditions while making choices that support optimal health.

## Traditional Sri Lankan Diet: The Good Foundation

### Historical Context
Traditional Sri Lankan diets were naturally balanced, featuring:
- **Variety of Vegetables**: Leafy greens, gourds, and root vegetables
- **Fresh Fish**: Abundant coastal and freshwater fish
- **Spices and Herbs**: Natural flavor enhancers with health benefits
- **Coconut**: Used in various forms throughout meals
- **Rice**: The staple grain, traditionally less processed
- **Fruits**: Seasonal tropical fruits rich in vitamins

### Health Benefits of Traditional Foods

#### Spices and Their Benefits
1. **Turmeric (Kaha)**: Anti-inflammatory properties, supports joint health
2. **Cinnamon (Kurundu)**: Helps regulate blood sugar levels
3. **Cardamom (Enasal)**: Aids digestion, has antioxidant properties
4. **Cloves (Karabu Nati)**: Antimicrobial and anti-inflammatory
5. **Fenugreek (Uluhal)**: Helps control blood sugar and cholesterol
6. **Coriander (Kottamalli)**: Supports digestive health

#### Traditional Vegetables
- **Gotukola**: Rich in antioxidants, supports brain health
- **Mukunuwenna**: High in protein and vitamins
- **Kankun**: Good source of iron and vitamins A and C
- **Nivithi**: Contains beneficial compounds for heart health
- **Drumstick Leaves (Murunga)**: Extremely nutrient-dense

#### Fish and Seafood
- **Omega-3 Fatty Acids**: Support heart and brain health
- **High-Quality Protein**: Essential for muscle maintenance
- **Minerals**: Iodine, selenium, and zinc

## Modern Challenges to Traditional Eating

### Processed Food Integration
- **Instant Noodles**: High in sodium and preservatives
- **Packaged Snacks**: Often high in trans fats and sugar
- **Sugary Drinks**: Replace traditional herbal drinks
- **Refined Oils**: Replace traditional coconut oil

### Lifestyle Changes
- **Time Constraints**: Less time for traditional cooking methods
- **Urbanization**: Reduced access to fresh, local produce
- **Western Influence**: Adoption of less healthy eating patterns
- **Portion Sizes**: Increased portion sizes, especially of rice

## Modernizing Traditional Recipes Healthily

### Rice-Based Meals

#### Traditional Approach
- Large portions of white rice
- Heavy coconut milk curries
- Limited vegetable variety

#### Healthy Modifications
1. **Portion Control**: Reduce rice portion, increase vegetable portion
2. **Brown Rice**: Gradually introduce brown rice or red rice
3. **Vegetable Rice**: Mix rice with finely chopped vegetables
4. **Coconut Milk**: Use light coconut milk or reduce quantity

#### Sample Healthy Sri Lankan Meal
- **1 cup brown rice** (instead of 2 cups white rice)
- **Fish curry** with reduced coconut milk
- **2-3 vegetable dishes** (mallung, stir-fry, curry)
- **Dhal curry** for protein and fiber
- **Fresh salad** with lime dressing

### Breakfast Innovations

#### Traditional Options (Healthier Versions)
1. **String Hoppers**: Made with brown rice flour
2. **Hoppers**: Reduce sugar, add vegetables
3. **Roti**: Use whole wheat flour, add vegetables
4. **Kiribath**: Smaller portions with fruit

#### Modern Healthy Additions
- **Smoothie Bowls**: With local fruits and coconut
- **Oats**: Prepared with coconut milk and local fruits
- **Egg Dishes**: With local vegetables and spices

### Snack Transformations

#### Instead of Processed Snacks
- **Roasted Chickpeas**: With Sri Lankan spices
- **Fruit Salads**: With lime and chili powder
- **Coconut Chips**: Baked, not fried
- **Vegetable Chips**: Baked sweet potato, beetroot, or plantain

## Practical Implementation Strategies

### Meal Planning

#### Weekly Planning
1. **Sunday**: Plan meals for the week
2. **Monday-Wednesday**: Prepare base ingredients
3. **Thursday-Saturday**: Cook fresh daily meals
4. **Batch Cooking**: Prepare spice mixes and base curries

#### Shopping Tips
- **Local Markets**: Buy fresh, seasonal produce
- **Bulk Buying**: Purchase spices and grains in bulk
- **Seasonal Eating**: Choose fruits and vegetables in season
- **Read Labels**: Avoid products with excessive additives

### Cooking Modifications

#### Healthier Cooking Methods
1. **Steaming**: For vegetables and fish
2. **Grilling**: Instead of deep frying
3. **Stir-frying**: With minimal oil
4. **Baking**: For snacks and some curries

#### Oil and Fat Management
- **Coconut Oil**: Use in moderation, choose virgin coconut oil
- **Other Oils**: Olive oil for salads, sesame oil for flavor
- **Reduce Quantity**: Use non-stick pans to reduce oil needs
- **Natural Fats**: From nuts, seeds, and avocados

### Portion Control Strategies

#### Visual Guides
- **Rice**: Size of your fist
- **Protein**: Palm-sized portion
- **Vegetables**: Fill half your plate
- **Fats**: Thumb-sized portion

#### Traditional Serving Methods
- **Banana Leaves**: Natural portion control
- **Small Plates**: Encourage smaller portions
- **Family Style**: Share multiple dishes

## Special Considerations

### For Diabetes Prevention
- **Low Glycemic Index**: Choose brown rice, vegetables, legumes
- **Fiber Rich**: Include plenty of vegetables and fruits
- **Protein Balance**: Include fish, eggs, or legumes in every meal
- **Spice Benefits**: Use cinnamon, fenugreek, and turmeric regularly

### For Heart Health
- **Omega-3 Rich**: Include fish 2-3 times per week
- **Reduce Sodium**: Limit processed foods and added salt
- **Antioxidants**: Colorful vegetables and fruits
- **Healthy Fats**: Nuts, seeds, and moderate coconut oil

### For Weight Management
- **Calorie Awareness**: Understand portion sizes
- **Nutrient Density**: Choose foods high in nutrients, lower in calories
- **Hydration**: Drink plenty of water, herbal teas
- **Mindful Eating**: Eat slowly, enjoy flavors

## Sample Weekly Menu

### Monday
- **Breakfast**: Brown rice string hoppers with sambol and dhal
- **Lunch**: Brown rice, fish curry, green bean curry, gotukola salad
- **Dinner**: Vegetable roti with chicken curry
- **Snacks**: Fresh fruit, roasted chickpeas

### Tuesday
- **Breakfast**: Oats with coconut milk, banana, and cinnamon
- **Lunch**: Red rice, lentil curry, eggplant curry, mallung
- **Dinner**: Hoppers with egg curry and pol sambol
- **Snacks**: Coconut water, vegetable sticks

### Wednesday
- **Breakfast**: Whole wheat roti with egg curry
- **Lunch**: Brown rice, prawn curry, okra curry, cucumber salad
- **Dinner**: String hoppers with chicken curry
- **Snacks**: Fresh fruit salad, herbal tea

## Conclusion

Balancing traditional Sri Lankan cuisine with modern health needs doesn't mean abandoning your cultural food heritage. Instead, it involves making thoughtful modifications that enhance the natural health benefits of traditional foods while addressing contemporary health challenges.

The key is gradual change, focusing on:
- Increasing vegetable portions
- Choosing whole grains when possible
- Moderating portion sizes
- Using traditional spices for their health benefits
- Maintaining the social and cultural aspects of shared meals

Remember, the goal is sustainable, enjoyable eating that honors your culture while supporting your health.

*Consult with a nutritionist familiar with Sri Lankan cuisine for personalized meal planning.*
    `,
    author: "Nutritionist Priya Jayawardena, MSc",
    authorBio: "Clinical Nutritionist with expertise in South Asian diets and diabetes prevention",
    date: "2024-01-10",
    category: "Nutrition",
    readTime: "18 min read",
    image: "/sri-lankan-healthy-food-traditional.png",
    tags: ["Nutrition", "Cultural Health", "Diet", "Traditional Foods"],
    views: 3156,
    likes: 198,
  },
  {
    id: 4,
    title: "Exercise for Busy Students: Quick Workouts That Work",
    excerpt:
      "Struggling to find time for exercise between studies and work? This guide provides practical, time-efficient workout routines designed specifically for students and young professionals with busy schedules.",
    content: `
# Exercise for Busy Students: Quick Workouts That Work

As a student or young professional in Sri Lanka, finding time for exercise can seem impossible between classes, assignments, part-time jobs, and social commitments. However, regular physical activity is crucial for both physical health and academic performance. This guide provides practical, time-efficient workout solutions that fit into even the busiest schedules.

## Why Exercise Matters for Students

### Academic Benefits
- **Improved Concentration**: Exercise increases blood flow to the brain
- **Better Memory**: Physical activity enhances memory formation and recall
- **Stress Reduction**: Exercise reduces cortisol levels and anxiety
- **Better Sleep**: Regular activity improves sleep quality
- **Increased Energy**: Paradoxically, exercise boosts energy levels

### Health Benefits
- **Weight Management**: Prevents the common "student weight gain"
- **Stronger Immune System**: Regular exercise reduces illness frequency
- **Better Posture**: Counteracts hours of sitting and studying
- **Cardiovascular Health**: Builds foundation for lifelong heart health
- **Mental Health**: Reduces depression and anxiety symptoms

## Time-Efficient Workout Principles

### High-Intensity Interval Training (HIIT)
HIIT involves short bursts of intense exercise followed by brief recovery periods. Benefits include:
- **Time Efficient**: Effective workouts in 15-20 minutes
- **Metabolic Boost**: Continues burning calories after exercise
- **No Equipment Needed**: Can be done anywhere
- **Cardiovascular Benefits**: Improves heart health quickly

### Compound Movements
Exercises that work multiple muscle groups simultaneously:
- **More Bang for Your Buck**: Work entire body in less time
- **Functional Strength**: Improves daily movement patterns
- **Calorie Burn**: Higher energy expenditure

### Bodyweight Training
Using your own body weight for resistance:
- **No Gym Required**: Exercise anywhere, anytime
- **Cost-Effective**: No equipment or membership fees
- **Progressive**: Can be made more challenging over time

## Quick Workout Routines

### The 7-Minute Scientific Workout

This research-backed routine requires only 7 minutes and your body weight:

1. **Jumping Jacks** (30 seconds)
2. **Wall Sit** (30 seconds)
3. **Push-ups** (30 seconds)
4. **Abdominal Crunches** (30 seconds)
5. **Step-ups** (30 seconds) - use stairs or sturdy chair
6. **Squats** (30 seconds)
7. **Triceps Dips** (30 seconds) - use chair or bed edge
8. **Plank** (30 seconds)
9. **High Knees Running** (30 seconds)
10. **Lunges** (30 seconds)
11. **Push-up Rotation** (30 seconds)
12. **Side Plank** (30 seconds each side)

*Rest 10 seconds between exercises*

### 15-Minute HIIT Routine

**Warm-up (2 minutes)**
- Arm circles (30 seconds)
- Leg swings (30 seconds)
- Light jogging in place (1 minute)

**Main Workout (10 minutes)**
Repeat this circuit 4 times:
- **Burpees** (30 seconds)
- **Rest** (30 seconds)
- **Mountain Climbers** (30 seconds)
- **Rest** (30 seconds)
- **Jump Squats** (30 seconds)
- **Rest** (30 seconds)

**Cool-down (3 minutes)**
- Walking in place (1 minute)
- Stretching (2 minutes)

### 20-Minute Strength Circuit

**Equipment needed**: None (optional: water bottles as weights)

**Circuit 1 (5 minutes)**
- Push-ups (1 minute)
- Squats (1 minute)
- Plank (1 minute)
- Lunges (1 minute)
- Rest (1 minute)

**Circuit 2 (5 minutes)**
- Pike push-ups (1 minute)
- Single-leg glute bridges (1 minute)
- Side plank (30 seconds each side)
- Reverse lunges (1 minute)
- Rest (1 minute)

**Circuit 3 (5 minutes)**
- Diamond push-ups (1 minute)
- Wall sit (1 minute)
- Dead bug (1 minute)
- Calf raises (1 minute)
- Rest (1 minute)

**Cool-down (5 minutes)**
- Full body stretching

## Micro-Workouts for Extremely Busy Days

### 5-Minute Energy Booster
Perfect between study sessions:
- Jumping jacks (1 minute)
- Push-ups (1 minute)
- Squats (1 minute)
- Plank (1 minute)
- Stretching (1 minute)

### Stair Climbing Workout (3-5 minutes)
If you have access to stairs:
- Walk up 2 steps at a time (1 minute)
- Run up single steps (1 minute)
- Side steps up (1 minute)
- Calf raises on bottom step (1 minute)
- Cool down walk (1 minute)

### Desk Break Exercises (2-3 minutes)
Can be done in study clothes:
- Desk push-ups (30 seconds)
- Chair squats (30 seconds)
- Calf raises (30 seconds)
- Shoulder rolls (30 seconds)
- Neck stretches (30 seconds)
- Seated spinal twist (30 seconds)

## Exercise Scheduling Strategies

### Time Block Method
- **Morning**: 15-20 minutes before classes
- **Lunch Break**: 10-15 minutes between classes
- **Evening**: 20-30 minutes before dinner
- **Study Breaks**: 5-minute micro-workouts every hour

### Weekly Planning

#### Minimum Effective Dose (3 days/week)
- **Monday**: 20-minute full body workout
- **Wednesday**: 15-minute HIIT session
- **Friday**: 20-minute strength circuit

#### Optimal Schedule (5-6 days/week)
- **Monday**: Upper body focus (20 minutes)
- **Tuesday**: HIIT cardio (15 minutes)
- **Wednesday**: Lower body focus (20 minutes)
- **Thursday**: Core and flexibility (15 minutes)
- **Friday**: Full body circuit (25 minutes)
- **Saturday**: Active recovery (walking, stretching)
- **Sunday**: Rest or light activity

### Integration with Daily Activities

#### Active Commuting
- Walk or bike to university when possible
- Get off bus one stop early and walk
- Take stairs instead of elevators
- Park farther away from destinations

#### Study Break Activities
- Do squats while reading notes
- Walk while reviewing flashcards
- Stand and stretch every 30 minutes
- Do calf raises while waiting in line

## Nutrition for Busy Students

### Pre-Workout (if time allows)
- Banana with peanut butter (30 minutes before)
- Handful of dates (15 minutes before)
- Green tea (30 minutes before)

### Post-Workout
- Chocolate milk (within 30 minutes)
- Greek yogurt with fruit
- Protein smoothie
- Boiled eggs with toast

### Hydration
- Drink water before, during, and after exercise
- Coconut water for longer sessions
- Avoid sugary sports drinks for short workouts

## Overcoming Common Obstacles

### "I Don't Have Time"
- Start with just 5 minutes daily
- Use study breaks for micro-workouts
- Exercise while doing other activities (walking meetings, active commuting)
- Remember: some exercise is better than none

### "I'm Too Tired"
- Exercise actually increases energy levels
- Start with light activity when tired
- Morning workouts can boost energy all day
- Poor fitness often causes fatigue, not the reverse

### "I Don't Have Space"
- Most exercises require only 6x6 feet of space
- Use outdoor areas like parks or courtyards
- Bodyweight exercises work in dorm rooms
- Get creative with furniture as equipment

### "I Can't Afford a Gym"
- Bodyweight exercises are free
- Use public spaces like parks
- YouTube has thousands of free workout videos
- Partner with friends for motivation and accountability

## Technology and Apps

### Helpful Apps
- **7 Minute Workout**: Guided quick routines
- **Nike Training Club**: Free workouts of various lengths
- **Sworkit**: Customizable workout lengths
- **MyFitnessPal**: Track activity and nutrition

### Online Resources
- YouTube fitness channels
- University fitness programs
- Student health center resources
- Free outdoor fitness groups

## Creating Sustainable Habits

### Start Small
- Begin with 5-10 minutes daily
- Focus on consistency over intensity
- Gradually increase duration and difficulty
- Celebrate small victories

### Make It Enjoyable
- Choose activities you like
- Exercise with friends
- Listen to music or podcasts
- Vary your routines to prevent boredom

### Track Progress
- Keep a simple exercise log
- Take progress photos
- Note improvements in energy and mood
- Set realistic, achievable goals

### Accountability
- Find a workout buddy
- Join student fitness groups
- Share goals with friends and family
- Use social media for motivation

## Sample Weekly Schedule for Different Student Types

### Full-Time Student with Part-Time Job
- **Monday**: 7-minute workout before classes
- **Tuesday**: 15-minute HIIT during lunch break
- **Wednesday**: Rest day or light stretching
- **Thursday**: 7-minute workout before work
- **Friday**: 20-minute workout after classes
- **Weekend**: One longer session (30-45 minutes)

### Graduate Student with Research
- **Daily**: 5-minute micro-workouts every 2 hours
- **3x per week**: 15-20 minute focused sessions
- **Weekend**: One longer outdoor activity

### Commuter Student
- **During commute**: Walk part of the way
- **Between classes**: Stair climbing or quick circuits
- **At home**: 15-20 minute evening routines

## Conclusion

Regular exercise doesn't require hours at the gym or expensive equipment. With just 15-20 minutes of focused activity most days, you can significantly improve your health, academic performance, and quality of life.

The key is to:
- Start small and build gradually
- Focus on consistency over perfection
- Use time-efficient, high-impact exercises
- Integrate movement into your daily routine
- Make it enjoyable and sustainable

Remember, the best workout is the one you'll actually do. Find what works for your schedule, preferences, and lifestyle, then stick with it.

*Consult with a healthcare provider before starting any new exercise program, especially if you have health conditions or concerns.*
    `,
    author: "Fitness Coach Kasun Silva, BSc",
    authorBio: "Certified Personal Trainer specializing in time-efficient workouts for busy professionals",
    date: "2024-01-08",
    category: "Fitness",
    readTime: "16 min read",
    image: "/student-exercise-quick-workout.png",
    tags: ["Exercise", "Student Life", "Time Management", "HIIT"],
    views: 2134,
    likes: 167,
  },
  {
    id: 5,
    title: "Mental Health and Physical Health: Understanding the Vital Connection",
    excerpt:
      "Explore the intricate relationship between mental and physical health, and learn how stress, anxiety, and depression can directly impact your risk for diabetes and heart disease. Discover practical strategies for holistic wellness.",
    content: `
# Mental Health and Physical Health: Understanding the Vital Connection

The relationship between mental and physical health is far more interconnected than many people realize. For young adults in Sri Lanka, understanding this connection is crucial, especially given the increasing rates of both mental health challenges and chronic diseases like diabetes and cardiovascular disease among Sri Lankan youth.

## The Mind-Body Connection: Scientific Evidence

### How Mental Health Affects Physical Health

#### Stress Response System
When you experience stress, anxiety, or depression, your body activates the "fight-or-flight" response:
- **Cortisol Release**: Chronic stress leads to elevated cortisol levels
- **Blood Sugar Impact**: Cortisol increases blood glucose levels
- **Blood Pressure**: Stress hormones raise blood pressure
- **Inflammation**: Chronic stress promotes inflammatory responses
- **Immune Suppression**: Prolonged stress weakens immune function

#### Cardiovascular Impact
Mental health conditions directly affect heart health through:
- **Increased Heart Rate**: Anxiety and stress elevate resting heart rate
- **Blood Pressure Changes**: Chronic stress contributes to hypertension
- **Arterial Damage**: Stress hormones can damage blood vessel walls
- **Blood Clotting**: Stress increases risk of blood clots
- **Irregular Rhythms**: Anxiety can trigger heart rhythm abnormalities

#### Diabetes Risk Factors
Mental health challenges increase diabetes risk by:
- **Insulin Resistance**: Chronic stress hormones reduce insulin sensitivity
- **Weight Gain**: Stress eating and hormonal changes promote weight gain
- **Sleep Disruption**: Poor mental health affects sleep, which impacts blood sugar
- **Medication Effects**: Some psychiatric medications increase diabetes risk
- **Lifestyle Factors**: Depression often leads to poor diet and exercise habits

## Common Mental Health Challenges in Sri Lankan Youth

### Academic and Career Pressure
- **Competitive Education System**: Intense pressure for academic achievement
- **Career Uncertainty**: Job market challenges and economic pressures
- **Family Expectations**: Cultural emphasis on academic and professional success
- **Social Comparison**: Constant comparison with peers and social media

### Social and Cultural Factors
- **Stigma**: Mental health stigma prevents seeking help
- **Traditional Gender Roles**: Pressure to conform to cultural expectations
- **Economic Stress**: Financial pressures on families
- **Urbanization**: Loss of traditional support systems

### Modern Lifestyle Stressors
- **Technology Overload**: Constant connectivity and information overload
- **Social Media**: Comparison culture and cyberbullying
- **Sedentary Lifestyle**: Reduced physical activity affecting mood
- **Poor Sleep Patterns**: Irregular schedules affecting mental health

## Recognizing the Signs

### Physical Symptoms of Mental Health Issues
- **Chronic Fatigue**: Persistent tiredness despite adequate rest
- **Headaches**: Frequent tension headaches or migraines
- **Digestive Issues**: Stomach problems, nausea, or appetite changes
- **Muscle Tension**: Chronic pain in neck, shoulders, or back
- **Sleep Disturbances**: Insomnia or excessive sleeping
- **Frequent Illness**: Weakened immune system leading to frequent infections

### Mental Health Warning Signs
- **Persistent Sadness**: Feeling down for weeks or months
- **Anxiety**: Excessive worry about daily activities
- **Irritability**: Increased anger or frustration
- **Social Withdrawal**: Avoiding friends, family, or activities
- **Concentration Problems**: Difficulty focusing on studies or work
- **Loss of Interest**: No longer enjoying previously loved activities

## The Vicious Cycle

### How Physical and Mental Health Reinforce Each Other

#### Negative Cycle
1. **Stress/Anxiety** → Poor sleep and eating habits
2. **Poor Lifestyle** → Physical health problems
3. **Physical Illness** → Increased stress and worry
4. **More Stress** → Worsening physical symptoms
5. **Cycle Continues** → Both mental and physical health decline

#### Breaking the Cycle
1. **Address Mental Health** → Improved stress management
2. **Better Lifestyle Choices** → Regular exercise and healthy eating
3. **Improved Physical Health** → Better energy and mood
4. **Enhanced Mental Wellbeing** → Positive reinforcement
5. **Upward Spiral** → Both aspects of health improve together

## Holistic Wellness Strategies

### Stress Management Techniques

#### Mindfulness and Meditation
- **Daily Practice**: Start with 5-10 minutes daily
- **Breathing Exercises**: Simple techniques for immediate stress relief
- **Body Scan**: Progressive muscle relaxation
- **Mindful Activities**: Eating, walking, or studying mindfully

#### Traditional Sri Lankan Practices
- **Ayurvedic Principles**: Balance of mind, body, and spirit
- **Yoga and Meditation**: Ancient practices for modern stress
- **Herbal Remedies**: Traditional herbs like gotukola for mental clarity
- **Temple Visits**: Spiritual practices for peace and reflection

### Physical Activity for Mental Health

#### Exercise as Medicine
- **Endorphin Release**: Natural mood elevators
- **Stress Reduction**: Physical activity reduces cortisol levels
- **Sleep Improvement**: Regular exercise promotes better sleep
- **Self-Esteem**: Physical achievements boost confidence
- **Social Connection**: Group activities provide social support

#### Recommended Activities
- **Walking**: Simple, accessible, and effective
- **Swimming**: Full-body exercise with meditative qualities
- **Dancing**: Cultural dances combine exercise with cultural connection
- **Team Sports**: Social interaction with physical activity
- **Yoga**: Combines physical movement with mindfulness

### Nutrition for Mental Health

#### Brain-Healthy Foods
- **Omega-3 Fatty Acids**: Fish, walnuts, flaxseeds
- **Complex Carbohydrates**: Brown rice, oats, quinoa
- **Antioxidants**: Colorful fruits and vegetables
- **Protein**: Lean meats, legumes, eggs
- **Probiotics**: Yogurt, fermented foods

#### Foods to Limit
- **Processed Foods**: High in additives and preservatives
- **Excessive Sugar**: Causes blood sugar spikes and crashes
- **Caffeine**: Can increase anxiety in sensitive individuals
- **Alcohol**: Depressant that affects sleep and mood
- **Trans Fats**: Promote inflammation

### Sleep Hygiene

#### Importance of Quality Sleep
- **Mental Health**: Poor sleep worsens depression and anxiety
- **Physical Health**: Sleep affects immune function and metabolism
- **Cognitive Function**: Sleep is crucial for memory and concentration
- **Emotional Regulation**: Sleep deprivation affects mood stability

#### Sleep Improvement Strategies
- **Consistent Schedule**: Same bedtime and wake time daily
- **Sleep Environment**: Cool, dark, quiet room
- **Pre-Sleep Routine**: Relaxing activities before bed
- **Screen Limits**: Avoid screens 1 hour before sleep
- **Caffeine Timing**: No caffeine after 2 PM

## Building Resilience

### Developing Coping Skills

#### Problem-Focused Coping
- **Time Management**: Organize tasks and priorities
- **Goal Setting**: Break large goals into manageable steps
- **Skill Building**: Develop competencies to handle challenges
- **Resource Utilization**: Know where to get help when needed

#### Emotion-Focused Coping
- **Acceptance**: Acknowledge difficult emotions without judgment
- **Reframing**: Look for positive aspects or learning opportunities
- **Emotional Expression**: Talk, write, or create art about feelings
- **Relaxation**: Use techniques to manage emotional intensity

### Social Support Systems

#### Building Connections
- **Family Relationships**: Maintain close family bonds
- **Friendships**: Cultivate meaningful friendships
- **Community Involvement**: Participate in local groups or activities
- **Professional Support**: Don't hesitate to seek professional help

#### Cultural Support
- **Religious Communities**: Find support in spiritual communities
- **Cultural Groups**: Connect with others who share your background
- **Mentorship**: Seek guidance from older, experienced individuals
- **Peer Support**: Connect with others facing similar challenges

## Professional Help and Resources

### When to Seek Help

#### Warning Signs
- Symptoms persist for more than two weeks
- Difficulty functioning in daily life
- Thoughts of self-harm or suicide
- Substance abuse as coping mechanism
- Relationship or work problems due to mental health

#### Types of Professional Help
- **Counselors**: Talk therapy and coping strategies
- **Psychologists**: Psychological testing and therapy
- **Psychiatrists**: Medical treatment and medication
- **Social Workers**: Community resources and support services

### Resources in Sri Lanka

#### Government Services
- **National Institute of Mental Health**: Specialized mental health care
- **District General Hospitals**: Mental health units
- **Primary Health Care**: Basic mental health services
- **School Counselors**: Support for students

#### Private Services
- **Private Hospitals**: Comprehensive mental health services
- **Private Practitioners**: Individual therapy and counseling
- **NGOs**: Community-based mental health programs
- **Online Services**: Teletherapy and digital mental health tools

## Creating Your Wellness Plan

### Assessment Phase
1. **Mental Health Check**: Evaluate current stress levels and mood
2. **Physical Health Review**: Assess current health status
3. **Lifestyle Analysis**: Review diet, exercise, and sleep patterns
4. **Support System**: Identify available support resources

### Goal Setting
1. **Specific Goals**: Clear, measurable objectives
2. **Realistic Timeline**: Achievable milestones
3. **Balanced Approach**: Address both mental and physical health
4. **Regular Review**: Adjust goals as needed

### Implementation Strategies
1. **Start Small**: Begin with manageable changes
2. **Track Progress**: Keep a wellness journal
3. **Seek Support**: Don't try to do everything alone
4. **Be Patient**: Change takes time and consistency

## Conclusion

The connection between mental and physical health is undeniable and profound. For Sri Lankan youth facing increasing pressures and health challenges, understanding this relationship is the first step toward comprehensive wellness.

Key takeaways:
- Mental health directly impacts physical health and vice versa
- Chronic stress increases risk for diabetes and heart disease
- Holistic approaches addressing both aspects are most effective
- Professional help is available and should be utilized when needed
- Small, consistent changes can lead to significant improvements

Remember that seeking help for mental health is a sign of strength, not weakness. Just as you would treat a physical injury, mental health challenges deserve attention and care.

By taking a holistic approach to wellness that addresses both mental and physical health, you can build resilience, prevent chronic diseases, and create a foundation for lifelong wellbeing.

*If you're experiencing thoughts of self-harm or suicide, please seek immediate help. Contact the National Mental Health Helpline or visit your nearest hospital emergency department.*
    `,
    author: "Dr. Nimal Rajapakse, MD, MRCPsych",
    authorBio: "Consultant Psychiatrist at National Institute of Mental Health, specializing in youth mental health",
    date: "2024-01-05",
    category: "Mental Health",
    readTime: "20 min read",
    image: "/mental-health-physical-health-connection.png",
    tags: ["Mental Health", "Stress Management", "Holistic Health", "Youth Wellness"],
    views: 1876,
    likes: 143,
  },
  {
    id: 6,
    title: "Family History and Genetic Risk: What You Need to Know About Inherited Health Risks",
    excerpt:
      "Understanding how family history affects your health risks is crucial for early prevention. Learn how to assess your genetic risk factors and take proactive steps to prevent diabetes and heart disease, even with a family history.",
    content: `
# Family History and Genetic Risk: What You Need to Know About Inherited Health Risks

Your family history is one of the most powerful tools for predicting and preventing future health problems. For young adults in Sri Lanka, understanding genetic risk factors for diabetes and cardiovascular disease can be life-changing, enabling early intervention and prevention strategies that can significantly alter health outcomes.

## Understanding Genetic Risk

### What is Genetic Predisposition?
Genetic predisposition means you have inherited genes that increase your likelihood of developing certain conditions. However, having genetic risk factors doesn't guarantee you'll develop a disease – it simply means you need to be more vigilant about prevention.

### Key Concepts
- **Genes vs. Environment**: Genetics load the gun, but lifestyle pulls the trigger
- **Penetrance**: Not all genetic risks manifest as disease
- **Polygenic Inheritance**: Most chronic diseases involve multiple genes
- **Epigenetics**: Environmental factors can influence gene expression

## Sri Lankan Genetic Landscape

### South Asian Genetic Factors

#### Diabetes Risk
Sri Lankans and other South Asians have:
- **Higher Insulin Resistance**: Genetic tendency toward insulin resistance
- **Lower BMI Threshold**: Develop diabetes at lower body weights
- **Abdominal Fat Distribution**: Tendency to store fat around organs
- **Beta Cell Dysfunction**: Pancreatic cells may be more susceptible to damage

#### Cardiovascular Risk
- **Early Onset**: Heart disease often develops 5-10 years earlier than in other populations
- **Metabolic Syndrome**: Higher rates of combined risk factors
- **Inflammatory Response**: Genetic tendency toward higher inflammation
- **Lipid Metabolism**: Different cholesterol patterns compared to other ethnicities

### Population-Specific Considerations
- **Consanguineous Marriages**: Common in some communities, increasing certain genetic risks
- **Founder Effects**: Some genetic variants are more common due to population history
- **Migration Patterns**: Health risks may vary based on regional ancestry within Sri Lanka

## Assessing Your Family History

### Information to Collect

#### First-Degree Relatives (Parents, Siblings, Children)
- **Diabetes**: Type 1, Type 2, gestational diabetes
- **Heart Disease**: Heart attacks, bypass surgery, stents, heart failure
- **Stroke**: Any type of stroke or mini-strokes
- **High Blood Pressure**: Hypertension diagnosis and treatment
- **High Cholesterol**: Lipid disorders requiring medication
- **Obesity**: Significant weight problems
- **Age of Diagnosis**: When conditions were first diagnosed
- **Age at Death**: If deceased, age and cause of death

#### Second-Degree Relatives (Grandparents, Aunts, Uncles)
- Same conditions as above
- **Kidney Disease**: Especially diabetes-related kidney problems
- **Eye Problems**: Diabetes-related vision issues
- **Amputations**: Diabetes-related complications

#### Third-Degree Relatives (Cousins)
- Major health conditions, especially if multiple family members affected

### Family History Documentation

#### Creating a Family Health Tree
1. **Start with Yourself**: Place yourself at the center
2. **Add Parents**: Include their health information
3. **Add Siblings**: Your brothers and sisters
4. **Add Grandparents**: Both maternal and paternal
5. **Add Aunts and Uncles**: Parents' siblings
6. **Include Cousins**: If relevant health information available

#### Information Organization
- **Use Symbols**: Different shapes for males/females, affected/unaffected
- **Color Coding**: Different colors for different conditions
- **Age Information**: Include current age or age at death
- **Update Regularly**: Family health information changes over time

## Risk Assessment Based on Family History

### High-Risk Scenarios

#### Diabetes Risk
- **Parent with Type 2 Diabetes**: 2-6 times higher risk
- **Both Parents with Diabetes**: Up to 50% lifetime risk
- **Sibling with Diabetes**: 3-4 times higher risk
- **Multiple Family Members**: Risk increases with number of affected relatives
- **Early Onset in Family**: Higher risk if family members developed diabetes before age 50

#### Cardiovascular Risk
- **Parent with Early Heart Disease**: Men before 55, women before 65
- **Multiple Family Members**: Several relatives with heart disease
- **Sudden Cardiac Death**: Family history of sudden death before age 50
- **Stroke History**: Family history of stroke, especially early onset

### Risk Calculation Tools

#### Diabetes Risk Assessment
Consider these factors:
- Family history (strongest predictor)
- Ethnicity (South Asian = higher risk)
- Age (risk increases with age)
- BMI (lower threshold for South Asians)
- Physical activity level
- Previous gestational diabetes (for women)

#### Cardiovascular Risk Scores
- **Framingham Risk Score**: Estimates 10-year heart disease risk
- **ASCVD Risk Calculator**: American Heart Association tool
- **QRISK**: Includes ethnicity and family history
- **Modified for South Asians**: Adjusted calculations for higher baseline risk

## Genetic Testing: Pros and Cons

### When Genetic Testing Might Be Considered

#### Strong Family History
- Multiple first-degree relatives with early-onset disease
- Unusual patterns of inheritance
- Rare genetic conditions suspected
- Family history of specific genetic syndromes

#### Types of Genetic Tests
- **Single Gene Tests**: Look for specific known mutations
- **Panel Tests**: Screen multiple genes simultaneously
- **Whole Genome Sequencing**: Comprehensive genetic analysis
- **Pharmacogenetic Tests**: How you respond to medications

### Limitations of Genetic Testing
- **Complex Inheritance**: Most chronic diseases involve multiple genes
- **Environmental Factors**: Genes don't determine destiny
- **Psychological Impact**: Results can cause anxiety or false reassurance
- **Cost and Accessibility**: May not be covered by insurance
- **Privacy Concerns**: Genetic information confidentiality

## Prevention Strategies for High-Risk Individuals

### Enhanced Screening Protocols

#### Diabetes Screening
- **Earlier Start**: Begin screening at age 25 instead of 35
- **More Frequent**: Annual instead of every 3 years
- **Additional Tests**: HbA1c, oral glucose tolerance test
- **Continuous Monitoring**: Consider continuous glucose monitors for very high-risk individuals

#### Cardiovascular Screening
- **Lipid Profiles**: Starting at age 20, every 2 years
- **Blood Pressure**: Regular monitoring, even if normal
- **Advanced Testing**: Coronary calcium scoring, carotid ultrasound
- **Stress Testing**: Exercise stress tests for high-risk individuals

### Intensive Lifestyle Modifications

#### Diet Strategies
- **Lower Carbohydrate Intake**: Especially refined carbohydrates
- **Portion Control**: Smaller portions, especially of rice
- **Increased Fiber**: More vegetables, legumes, whole grains
- **Healthy Fats**: Omega-3 fatty acids, nuts, olive oil
- **Regular Meal Timing**: Consistent eating schedule

#### Exercise Recommendations
- **Higher Intensity**: More vigorous exercise for high-risk individuals
- **Resistance Training**: Build muscle mass to improve insulin sensitivity
- **Daily Activity**: Aim for 10,000+ steps daily
- **Structured Programs**: Consider supervised exercise programs

#### Weight Management
- **Lower BMI Targets**: Aim for BMI 18.5-23 (lower than general population)
- **Waist Circumference**: Men <90cm, Women <80cm
- **Body Composition**: Focus on muscle mass, not just weight
- **Professional Support**: Work with nutritionists and trainers

### Medical Interventions

#### Preventive Medications
- **Metformin**: For prediabetes prevention in very high-risk individuals
- **Statins**: For cholesterol management with strong family history
- **ACE Inhibitors**: For blood pressure control and organ protection
- **Aspirin**: Low-dose for cardiovascular prevention (with medical supervision)

#### Regular Monitoring
- **Biomarker Tracking**: Regular blood tests for early detection
- **Imaging Studies**: Periodic scans to assess organ health
- **Specialist Consultations**: Regular visits to endocrinologists or cardiologists
- **Medication Adjustments**: Fine-tuning treatments based on response

## Psychological Aspects of Genetic Risk

### Coping with High-Risk Status

#### Common Emotional Responses
- **Anxiety**: Worry about developing family diseases
- **Guilt**: Feeling responsible for passing on genetic risks
- **Fatalism**: Believing disease is inevitable
- **Hypervigilance**: Excessive worry about symptoms
- **Denial**: Ignoring or minimizing genetic risks

#### Healthy Coping Strategies
- **Education**: Learn about your specific risks and prevention options
- **Action-Oriented Approach**: Focus on what you can control
- **Professional Support**: Genetic counseling and psychological support
- **Support Groups**: Connect with others facing similar risks
- **Mindfulness**: Stay present rather than worrying about future

### Family Communication

#### Sharing Genetic Information
- **Family Meetings**: Discuss health history openly
- **Medical Records**: Share relevant medical information
- **Encourage Screening**: Help family members understand their risks
- **Respect Privacy**: Not everyone wants to know their genetic risks

#### Talking to Children
- **Age-Appropriate Information**: Share information suitable for their age
- **Emphasize Prevention**: Focus on healthy lifestyle choices
- **Avoid Fear**: Don't create anxiety about future health
- **Model Behavior**: Demonstrate healthy lifestyle choices

## Special Considerations

### Women's Health

#### Pregnancy Planning
- **Preconception Counseling**: Discuss genetic risks before pregnancy
- **Gestational Diabetes**: Higher risk with family history
- **Pregnancy Monitoring**: More frequent screening during pregnancy
- **Postpartum Follow-up**: Continued monitoring after delivery

#### Hormonal Factors
- **PCOS**: Higher risk with family history of diabetes
- **Menopause**: Cardiovascular risk increases after menopause
- **Hormone Therapy**: Consider genetic risks when making decisions

### Men's Health

#### Early Screening
- **Cardiovascular Disease**: Men develop heart disease earlier
- **Metabolic Syndrome**: Higher risk with family history
- **Lifestyle Factors**: Address smoking, alcohol, stress

### Pediatric Considerations

#### Childhood Obesity
- **Early Intervention**: Address weight issues early
- **Family-Based Approaches**: Involve entire family in lifestyle changes
- **School Programs**: Support healthy choices in educational settings

#### Type 1 Diabetes
- **Autoimmune Screening**: Consider screening for high-risk children
- **Environmental Triggers**: Understand potential triggers
- **Early Detection**: Recognize symptoms early

## Creating Your Genetic Risk Action Plan

### Step 1: Assessment
- Complete comprehensive family history
- Calculate personal risk scores
- Identify highest priority risk factors
- Consult with healthcare providers

### Step 2: Screening Schedule
- Establish appropriate screening timeline
- Schedule regular health check-ups
- Plan for specialized testing if needed
- Create reminder systems for appointments

### Step 3: Lifestyle Optimization
- Develop personalized diet plan
- Create exercise routine appropriate for risk level
- Address stress management and sleep
- Eliminate or reduce harmful habits

### Step 4: Medical Management
- Establish relationships with appropriate specialists
- Consider preventive medications if recommended
- Monitor biomarkers regularly
- Adjust treatments based on results

### Step 5: Family Planning
- Share information with family members
- Plan for genetic counseling if considering children
- Create family health legacy for future generations
- Update family history regularly

## Conclusion

Having a family history of diabetes or heart disease doesn't mean you're destined to develop these conditions. Instead, it provides valuable information that can guide prevention efforts and early detection strategies.

Key points to remember:
- **Genetics is not destiny**: Lifestyle factors can significantly modify genetic risk
- **Early intervention works**: Prevention strategies are most effective when started early
- **Knowledge is power**: Understanding your risks enables informed decision-making
- **Professional guidance is valuable**: Work with healthcare providers who understand genetic risks
- **Family involvement helps**: Sharing information benefits entire families

By taking a proactive approach to genetic risk factors, you can significantly reduce your chances of developing diabetes and cardiovascular disease, even with a strong family history. The goal is not to live in fear of your genetic inheritance, but to use that knowledge to make informed choices that promote long-term health and wellbeing.

*Genetic counseling is recommended for individuals with strong family histories or complex genetic risk factors. Consult with healthcare professionals to develop personalized prevention strategies.*
    `,
    author: "Dr. Chamari Wickramasinghe, MD, PhD",
    authorBio: "Medical Geneticist and Consultant Physician specializing in inherited disease risk assessment",
    date: "2024-01-03",
    category: "Genetics",
    readTime: "22 min read",
    image: "/family-health-history-genetics.png",
    tags: ["Genetics", "Family History", "Risk Assessment", "Prevention"],
    views: 1654,
    likes: 121,
  },
]

const categories = ["All", "Diabetes", "Heart Health", "Nutrition", "Fitness", "Mental Health", "Genetics"]

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Diabetes":
        return <Droplets className="w-4 h-4" />
      case "Heart Health":
        return <Heart className="w-4 h-4" />
      case "Fitness":
        return <Activity className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Diabetes":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Heart Health":
        return "bg-red-100 text-red-800 border-red-200"
      case "Nutrition":
        return "bg-green-100 text-green-800 border-green-200"
      case "Fitness":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Mental Health":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Genetics":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Health Articles & Resources</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Expert-written articles on diabetes prevention, heart health, and wellness specifically for Sri Lankan youth
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search articles, topics, or tags..."
                    className="pl-10 text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white"
                          : "bg-transparent"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={filteredArticles[0].image || "/placeholder.svg"}
                    alt={filteredArticles[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
                    Featured Article
                  </Badge>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{filteredArticles[0].title}</h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">{filteredArticles[0].excerpt}</p>

                  <div className="flex items-center space-x-4 mb-6 text-sm text-slate-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{filteredArticles[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(filteredArticles[0].date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{filteredArticles[0].readTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {filteredArticles[0].tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/articles/${filteredArticles[0].id}`}>
                    <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white">
                      Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all h-full">
                <div className="relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className={`absolute top-4 left-4 ${getCategoryColor(article.category)}`}>
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(article.category)}
                      <span>{article.category}</span>
                    </div>
                  </Badge>
                </div>

                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-slate-600 mb-4 flex-1 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3" />
                      <span>{article.author.split(",")[0]}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <span>{article.readTime}</span>
                      <span>•</span>
                      <span>{article.views} views</span>
                    </div>
                    <Link href={`/articles/${article.id}`}>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Read More <ArrowRight className="ml-1 w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Articles Found</h3>
            <p className="text-slate-600">Try adjusting your search terms or category filter.</p>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card className="shadow-lg border-0 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated with Health Tips</h3>
              <p className="text-emerald-100 mb-6">
                Get the latest health articles and tips delivered to your inbox weekly
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/20 border-white/30 text-white placeholder:text-emerald-100"
                />
                <Button variant="secondary" className="bg-white text-emerald-600 hover:bg-emerald-50">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
