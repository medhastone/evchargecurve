import type { Metadata } from 'next';

export const BASE_URL = 'https://evchargecurve.com';

export type ToolKey =
  | 'dcFastCharge'
  | 'batteryHealth'
  | 'rangeLoss'
  | 'homeCharging'
  | 'compare'
  | 'carbonOffset'
  | 'idleDrain'
  | 'panelCapacity'
  | 'preconditioning'
  | 'destinationCharging'
  | 'v2hBackup';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolSeoConfig {
  key: ToolKey;
  path: string;
  primaryKeyword: string;
  title: string;
  description: string;
  softwareName: string;
  breadcrumbName: string;
  imageCaption: string;
  faqs: FAQItem[];
}

export const SEO_CONFIG: Record<ToolKey, ToolSeoConfig> = {
  dcFastCharge: {
    key: 'dcFastCharge',
    path: '/',
    primaryKeyword: 'ev charging curve calculator',
    title: 'EV Charging Curve Calculator & DC Fast Charge Time Tool',
    description:
      'Accurate EV charging curve calculator and DC fast charge time tool. Simulate real 10% to 80% taper drop-offs, charging speed, and charging session costs.',
    softwareName: 'EV Charging Curve & DC Fast Charge Simulator',
    breadcrumbName: 'DC Fast Charge Simulator',
    imageCaption: 'Real-time 10% to 80% EV DC fast charging curve simulator and session duration estimator.',
    faqs: [
      {
        question: 'Why do I need a specialized EV charging curve calculator instead of using peak kW?',
        answer:
          'Advertised peak kW is only sustained briefly (often 1 to 4 minutes) at low battery percentages. An EV charging curve calculator is essential for realistic highway trip planning because it integrates the inevitable step-down taper as the battery fills, providing mathematically accurate session durations.',
      },
      {
        question: 'How accurate is this DC fast charge time calculator for highway road trips?',
        answer:
          'Highly accurate. This DC fast charge time calculator is validated against real-world OBD2 CAN-bus telemetry, modeling standard 10% to 80% DC fast charge time windows, piecewise BMS step-downs, and the impact of ambient temperature and battery preconditioning.',
      },
      {
        question: 'Why does this DC fast charging speed drop off calculator warn against charging past 80%?',
        answer:
          'Because charging from 80% to 100% takes longer than EV charging time 10 to 80! As cell voltages approach 4.2V, the BMS slashes current to prevent lithium plating, increasing dwell time and per-minute stall occupancy fees while adding very little range.',
      },
      {
        question: 'Can this EV charging taper curve simulator account for cold weather & cold gating?',
        answer:
          'Yes. When an EV battery is cold (<32°F / 0°C) without preconditioning, internal resistance spikes and electrolyte ion mobility drops. Our EV charging taper curve simulator models how the BMS throttles charging power (often to under 40 kW) until the pack warms up.',
      },
      {
        question: 'How does station voltage architecture (400V vs 800V) affect charging time?',
        answer:
          '800V vehicles (such as the Hyundai Ioniq 5 and Porsche Taycan) draw higher power at lower cable amperage, reducing resistive heat losses and sustaining high peak rates up to 70% state of charge for 18-minute 10%–80% stops.',
      },
      {
        question: 'What is the optimal highway road trip charging strategy?',
        answer:
          'Arriving at DC fast chargers with a low state of charge (5%–12%) and departing at 65%–75% maximizes your average sustained charging power, minimizing total road trip transit time by avoiding the steep taper at higher battery percentages.',
      },
    ],
  },
  batteryHealth: {
    key: 'batteryHealth',
    path: '/battery-health',
    primaryKeyword: 'ev battery degradation calculator',
    title: 'EV Battery Degradation Calculator | State of Health Test',
    description:
      'Calculate battery capacity loss with our EV battery degradation calculator. Run an EV battery health test, calculate State of Health, and verify warranties.',
    softwareName: 'EV Battery Health & Degradation Sizer',
    breadcrumbName: 'Battery Health & Degradation',
    imageCaption: 'EV battery capacity retention and State of Health degradation curve over 10 years.',
    faqs: [
      {
        question: 'What is the average annual degradation rate for modern EV battery packs?',
        answer:
          'Modern liquid-cooled EV battery packs experience approximately 1.5% to 2.5% capacity loss in the first 20,000 miles due to initial SEI layer formation, stabilizing to a gradual 0.8% to 1.2% per year thereafter under standard thermal conditions.',
      },
      {
        question: 'How does battery chemistry (LFP vs NMC) impact long-term degradation?',
        answer:
          'Lithium Iron Phosphate (LFP) cells tolerate daily 100% charging and deliver 3,000+ full charge cycles with low calendar fade. Nickel Manganese Cobalt (NMC/NCA) cells offer higher energy density but degrade faster if stored above 80% state of charge or in extreme ambient heat.',
      },
      {
        question: 'What is the standard EV battery warranty degradation threshold for replacement?',
        answer:
          'Federally mandated US warranties (and standard global warranties) require automakers to cover EV traction batteries for a minimum of 8 years or 100,000 miles, guaranteeing a free battery repair or replacement if capacity retention drops below 70%.',
      },
      {
        question: 'How does frequent DC fast charging affect battery State of Health (SoH)?',
        answer:
          'Frequent DC fast charging in extreme heat accelerates Solid Electrolyte Interphase (SEI) growth and cathode micro-cracking, resulting in an additional 1.5% to 3.0% capacity loss over 100,000 miles compared to gentle AC Level 2 overnight charging.',
      },
      {
        question: 'How do I test the true State of Health (SoH) of a used EV battery before buying?',
        answer:
          'Connect a Bluetooth OBD2 scanner (such as an OBDLink LX or vLinker) with diagnostic software (ScanMyTesla, Car Scanner ELM OBD2, or Recurrent) to read nominal remaining kWh, total discharge cycles, and cell voltage balance (delta mV under load).',
      },
      {
        question: 'What charging habits maximize electric vehicle battery lifespan beyond 15 years?',
        answer:
          'Keep daily charge limits at 70% to 80% for NMC batteries, avoid letting the battery sit below 10% or at 100% for extended periods, charge on Level 2 AC power when possible, and precondition the pack before DC fast charging in cold weather.',
      },
    ],
  },
  rangeLoss: {
    key: 'rangeLoss',
    path: '/range-loss',
    primaryKeyword: 'ev cold weather range loss calculator',
    title: 'EV Cold Weather Range Loss Calculator & Towing Estimator',
    description:
      'Estimate winter highway drop with our EV cold weather range loss calculator. Model sub-zero temperatures, aerodynamic drag, and EV towing weight vs range.',
    softwareName: 'EV Winter Range & Towing Loss Estimator',
    breadcrumbName: 'Winter & Towing Range Loss',
    imageCaption: 'EV winter sub-zero highway range loss and aerodynamic trailer towing consumption model.',
    faqs: [
      {
        question: 'Why do electric vehicles lose 25% to 40% range in sub-zero winter temperatures?',
        answer:
          'Cold temperatures increase internal electrolyte viscosity and chemical resistance (overpotential), reducing usable battery capacity, while high-voltage cabin heating draws 3 to 6 kW of continuous power directly from the traction pack and denser cold air increases aerodynamic drag.',
      },
      {
        question: 'How much does a heat pump vs resistive PTC heater affect winter EV highway range?',
        answer:
          'Vapor-injection heat pumps achieve a Coefficient of Performance (COP) between 2.0 and 3.5 by scavenging thermal energy from the drive unit and ambient air, consuming only 1.0 to 1.8 kW compared to 4.0 to 6.0 kW for resistive PTC heaters (COP 1.0) and reclaiming 10% to 15% total range in 20°F to 40°F weather.',
      },
      {
        question: 'Why does trailer frontal surface area reduce EV towing range far more than trailer weight?',
        answer:
          'At highway speeds above 55 mph, aerodynamic drag accounts for over 75% of total energy consumption. A tall, blunt 8x8 ft box travel trailer nearly doubles vehicle drag area (CdA), causing consumption to surge from ~320 Wh/mi to 750–900 Wh/mi regardless of whether it is lightly loaded.',
      },
      {
        question: 'How does highway speed (65 mph vs 75+ mph) compound winter and towing range loss?',
        answer:
          'Aerodynamic drag scales quadratically with velocity (v²), and power consumption scales cubically (v³). Slowing down from 75 mph to 65 mph while towing or driving in freezing weather reduces energy consumption by 15% to 22%, extending driving distance between charging stops by 30 to 50 miles.',
      },
      {
        question: 'How much do winter snow tires and increased cold air density reduce EV efficiency?',
        answer:
          'Winter tires feature aggressive siping and softer tread compounds that increase rolling resistance by 4% to 8%. Simultaneously, freezing air at 10°F is roughly 12% denser than warm air at 75°F, proportionally increasing aerodynamic drag on the vehicle body.',
      },
      {
        question: 'How does departure preconditioning while plugged in preserve winter driving range?',
        answer:
          'Preconditioning draws AC electricity from the grid to warm both the cabin and the 1,000-lb traction battery to its optimal electrochemical operating temperature (68°F–86°F / 20°C–30°C) before departure, preserving 10% to 15% of battery capacity and restoring full regenerative braking.',
      },
    ],
  },
  homeCharging: {
    key: 'homeCharging',
    path: '/home-charging',
    primaryKeyword: 'ev home charging time calculator 240v',
    title: 'EV Home Charging Time Calculator 240V | Level 2 & TOU Cost Estimator',
    description:
      'Calculate overnight charging times with our EV home charging time calculator 240V. Compare Level 2 NEMA 14-50 vs 48A hardwired speeds, off-peak TOU rates, and annual fuel savings.',
    softwareName: 'EV Home Charging Time & TOU Cost Calculator',
    breadcrumbName: 'Home Charging & 240V Time',
    imageCaption: 'Level 2 240V residential charging session durations, breaker amperage sizing, and Time-of-Use electricity cost comparison.',
    faqs: [
      {
        question: 'How long does a 240V Level 2 charger take to charge an EV from 10% to 80%?',
        answer:
          'A standard 240V 32A (7.7 kW / NEMA 14-50) home charger adds 25 to 30 miles of range per hour, charging a typical 75 kWh battery from 10% to 80% in 6.5 to 7.5 hours. A 48A (11.5 kW) hardwired station completes the same session in 4.5 to 5 hours.',
      },
      {
        question: 'What is the NEC 80% continuous load rule for EV home chargers?',
        answer:
          'Under National Electrical Code (NEC Article 625), electric vehicle charging is classified as a continuous load (lasting over 3 hours). The continuous current draw must never exceed 80% of the circuit breaker rating. A 50A breaker allows a maximum 40A continuous draw, a 40A breaker allows 32A, and a 60A breaker allows 48A.',
      },
      {
        question: 'Why is 240V Level 2 charging more energy-efficient than 120V Level 1 charging?',
        answer:
          'Level 2 charging achieves 88% to 93% AC-to-DC conversion efficiency compared to only 74% to 82% on 120V Level 1. At 120V (1.4 kW), fixed parasitic loads (BMS computers, coolant pumps, inverter overhead) consume 250W to 350W continuously—wasting up to 25% of supplied power as heat.',
      },
      {
        question: 'What is the difference between a NEMA 14-50 plug-in charger and a hardwired 48A EVSE?',
        answer:
          'Plug-in NEMA 14-50 chargers plug into a 240V wall receptacle and are capped at 40A continuous (9.6 kW) on a 50A breaker. Hardwired chargers connect directly to conduit and can draw 48A continuous (11.5 kW) on a 60A breaker, providing 20% faster charging without nuisance GFCI tripping.',
      },
      {
        question: 'How much money does off-peak Time-of-Use (TOU) home charging save per year?',
        answer:
          'Switching to a dedicated utility EV Time-of-Use (TOU) tariff (typically $0.07 to $0.14/kWh overnight vs $0.35 to $0.50/kWh peak) lowers the cost to fully recharge a 75 kWh battery to $6–$10, saving $1,200 to $2,200 annually compared to gasoline fueling.',
      },
      {
        question: 'Why does my EV charge slower than the maximum kW rating of my home charger?',
        answer:
          'Charging speed is determined by the vehicle onboard AC-to-DC charger (OBC) bottleneck. If your vehicle has a 7.7 kW or 9.6 kW onboard inverter, it will draw a maximum of 32A or 40A, regardless of whether your wall EVSE is rated for 48A or 80A.',
      },
    ],
  },
  compare: {
    key: 'compare',
    path: '/compare',
    primaryKeyword: 'ev charging curve comparison tool',
    title: 'EV Charging Curve Comparison Tool | 10-80% Speed Faceoff',
    description:
      'Compare electric vehicle DC fast charging curves side-by-side. Analyze 150kW vs 350kW charging times, 800V vs 400V architecture, and 15-minute road trip miles added.',
    softwareName: 'EV Head-to-Head Charging Speed & Dwell Time Comparison Tool',
    breadcrumbName: 'Compare Charging Curves',
    imageCaption: 'Side-by-side EV charging curve comparison displaying 150kW vs 350kW power acceptance profiles and 10% to 80% dwell times.',
    faqs: [
      {
        question: 'Does plugging a 150kW peak EV into a 350kW charger make it charge any faster?',
        answer:
          'No. The vehicle onboard Battery Management System (BMS) controls the maximum current intake. A car capped at 150 kW will draw 150 kW regardless of whether the station is rated for 150 kW, 250 kW, or 350 kW.',
      },
      {
        question: 'Why do some EVs with lower peak kW charge faster from 10% to 80%?',
        answer:
          'Average sustained power across the entire charging session matters far more than short-lived peak power. An EV sustaining a flat 135 kW curve will beat a vehicle that peaks at 220 kW but immediately drops to 70 kW past 40% SoC.',
      },
      {
        question: 'How do 800V vehicles perform on 400V DC fast chargers?',
        answer:
          '800V vehicles use an internal DC-DC booster or rear motor inverter circuit to step up the 400V station voltage to 800V. This typically caps maximum charging throughput to between 50 kW and 135 kW depending on the vehicle hardware design.',
      },
      {
        question: 'How do cold ambient temperatures affect comparative charging speeds?',
        answer:
          'Without active battery preconditioning in freezing conditions (evaluated using our cold weather range loss calculator), lithium ions move slowly through the liquid electrolyte, creating high internal resistance. The BMS limits charging power (often to under 45 kW) to prevent lithium plating until the pack reaches ~68°F (20°C).',
      },
      {
        question: 'What is the optimal highway road trip charging strategy?',
        answer:
          'Arriving at DC fast chargers with a low state of charge (10%–15%) and departing at 60%–70% state of charge maximizes your average charging power and minimizes total road trip transit time by skipping the slow taper past 80%.',
      },
      {
        question: 'Why do EV charging curves drop off so drastically after 80% SoC?',
        answer:
          'As the graphite anode fills with intercalated lithium ions, cell voltage nears its upper physical limit (~4.2V per cell). To avoid cell degradation and thermal runaway, the BMS switches from Constant Current (CC) mode to Constant Voltage (CV) mode, causing power to taper sharply.',
      },
    ],
  },
  carbonOffset: {
    key: 'carbonOffset',
    path: '/carbon-offset',
    primaryKeyword: 'ev co2 emissions saved calculator',
    title: 'EV CO2 Emissions Saved Calculator | Well-to-Wheel Carbon Offset',
    description:
      'Calculate real lifecycle carbon dioxide reduction with our EV CO2 emissions saved calculator. Models Well-to-Wheel grid carbon intensity, gasoline upstream refining, and tree offsets.',
    softwareName: 'EV Well-to-Wheel Lifecycle Carbon Offset Calculator',
    breadcrumbName: 'Carbon Offset & CO2 Savings',
    imageCaption: 'Well-to-Wheel lifecycle greenhouse gas emissions reduction comparison between EVs and ICE vehicles across regional power grids.',
    faqs: [
      {
        question: 'Why is an electric vehicle cleaner than gasoline even when charged on a coal or natural gas grid?',
        answer:
          'Electric drivetrains convert 85% to 90% of electrical energy into wheel propulsion, compared to internal combustion engines (ICE) which waste 75% to 80% of fuel energy as lost heat. Furthermore, large industrial combined-cycle power plants generate power at ~60% thermodynamic efficiency, making an EV 30% to 45% cleaner even on fossil-heavy grids.',
      },
      {
        question: 'What is the Well-to-Wheel (WTW) carbon footprint of burning a gallon of gasoline?',
        answer:
          'Burning a single gallon of gasoline emits 8,887 grams of tailpipe CO2 (Tank-to-Wheel). However, crude oil drilling, flaring, pipeline transit, distillation, and tanker distribution add an additional 2,213 grams of upstream emissions (Well-to-Tank), bringing the true Well-to-Wheel footprint to 11,100 grams (24.5 lbs) of CO2 per gallon.',
      },
      {
        question: 'How many miles does it take for an EV to offset its battery manufacturing carbon debt?',
        answer:
          'Producing an EV battery emits approximately 65 to 90 kg of CO2 per kWh of pack capacity. On an average electrical grid, an EV completely repays its manufacturing carbon debt within 14,000 to 22,000 miles (12 to 18 months of driving). On clean renewable or solar grids, payback occurs in under 8,000 miles.',
      },
      {
        question: 'How does regional electric grid carbon intensity (g CO2/kWh) affect EV lifecycle emissions?',
        answer:
          'Grid carbon intensity varies from under 25 g CO2/kWh in clean regions (Norway, France, Washington State) to ~370 g/kWh on the average US grid and over 600 g/kWh in coal-heavy regions. In clean-energy regions, driving an EV eliminates over 92% of operational lifecycle greenhouse gas emissions.',
      },
      {
        question: 'How many mature trees planted is equivalent to the annual CO2 savings of driving an EV?',
        answer:
          'Driving an EV 15,000 miles annually instead of a 28 mpg gasoline car prevents roughly 4.1 metric tons (9,040 lbs) of Well-to-Wheel CO2 from entering the atmosphere. Because an average mature tree absorbs approximately 48 lbs (22 kg) of CO2 per year, this is equivalent to planting 180 to 200 mature trees annually.',
      },
      {
        question: 'How does charging an EV from rooftop solar or off-peak green power affect carbon emissions?',
        answer:
          'Charging directly from home rooftop solar or through a 100% certified green utility tariff reduces operational Well-to-Wheel emissions to 0 grams of CO2 per mile. This maximizes emissions reductions and accelerates the battery manufacturing payback period to under 10 months.',
      },
    ],
  },
  idleDrain: {
    key: 'idleDrain',
    path: '/idle-drain',
    primaryKeyword: 'ev phantom drain calculator',
    title: 'EV Phantom Drain Calculator | Airport Parking Battery Loss',
    description:
      'Calculate vampire battery drain when parking your EV at airports or long-term storage. Models Tesla Sentry Mode, BMS thermal loops, and freezing weather.',
    softwareName: 'EV Phantom Vampire Drain Calculator',
    breadcrumbName: 'Phantom Vampire Drain',
    imageCaption: 'Long-term airport parking EV standby battery drain and security camera wake consumption model.',
    faqs: [
      {
        question: 'How much battery percentage does an EV lose parked at an airport for two weeks?',
        answer:
          'In deep sleep mode, an EV loses 0.5% to 1.0% State of Charge per week (1% to 2% total over 14 days). If security surveillance modes like Tesla Sentry Mode or Rivian Gear Guard remain active, loss exceeds 2.5% to 4.0% per day, depleting 35% to 55% of the total battery pack.',
      },
      {
        question: 'At what battery percentage do vehicle surveillance modes turn off automatically?',
        answer:
          'Most EV manufacturers (including Tesla, Rivian, and Lucid) automatically disable active camera monitoring (such as Sentry Mode or Gear Guard) when the traction battery drops to 20% State of Charge to protect essential vehicle propulsion reserves and prevent low-voltage battery bricking.',
      },
      {
        question: 'Why does extreme winter cold accelerate parking vampire drain?',
        answer:
          'In sub-zero temperatures (<15°F / -10°C), the battery management system (BMS) periodically wakes up to energize high-voltage PTC coolant heaters to prevent irreversible electrolyte freezing. Additionally, cold-soaking temporarily locks electrochemical capacity behind a snowflake icon until cells are driven.',
      },
      {
        question: 'Do third-party vehicle tracking apps worsen phantom drain?',
        answer:
          'Yes. Frequent automated polling from third-party telemetry apps (such as smart home integrations or logging tools) keeps the vehicle gateway awake, preventing high-voltage contactors from opening and increasing continuous standby power consumption from 20W to 120W+.',
      },
      {
        question: 'What is the hardware power draw of Tesla Sentry Mode while parked?',
        answer:
          'Tesla Sentry Mode keeps the main HW3/HW4 FSD computer, 8 optical cameras, and video storage controllers fully energized, resulting in a continuous baseline power draw of 240W to 300W. Over 24 hours, this consumes approximately 5.8 kWh to 7.2 kWh of energy (~20 to 28 miles of driving range).',
      },
      {
        question: 'How can I minimize phantom drain when leaving my EV at the airport?',
        answer:
          'To minimize airport standby drain: 1) Disable Sentry Mode and Gear Guard, 2) Turn off Cabin Overheat Protection, 3) Avoid opening the mobile app to prevent waking the vehicle gateway, 4) Close background third-party logging integrations, and 5) Arrive with at least 50% to 60% SoC in winter.',
      },
    ],
  },
  panelCapacity: {
    key: 'panelCapacity',
    path: '/panel-capacity',
    primaryKeyword: 'ev charger breaker size calculator',
    title: 'EV Charger Breaker Size Calculator | 100A Panel Capacity',
    description:
      'Calculate if your 100A or 200A home electrical panel can handle an EV charger without a costly upgrade. Computes NEC 80% continuous loads and breaker sizes.',
    softwareName: 'EV Electrical Panel Capacity & Breaker Sizer',
    breadcrumbName: 'Breaker & Panel Capacity',
    imageCaption: 'NEC 80% continuous load calculations for 100A and 200A residential electrical service panels.',
    faqs: [
      {
        question: 'Can I add a Level 2 EV charger to an existing 100-amp main breaker panel without upgrading to 200A?',
        answer:
          'Yes. Most 100A panels can safely accommodate a 20A or 30A dedicated circuit (delivering 16A or 24A continuous / 3.8 kW to 5.7 kW). This adds 130 to 200 miles of range in an 8-hour overnight charging window, completely fulfilling daily driving needs while avoiding a $4,000 service upgrade.',
      },
      {
        question: 'What is the National Electrical Code (NEC) 80% continuous load rule for EV chargers?',
        answer:
          'Under NEC Article 625, EV charging is classified as a continuous load (drawing maximum current for 3 hours or more). To prevent thermal accumulation and nuisance breaker tripping, the continuous charging current must not exceed 80% of the branch circuit breaker rating (e.g., 32A max on a 40A breaker, 40A max on a 50A breaker).',
      },
      {
        question: 'What is an EV Energy Management System (EVEMS) / Smart Load Shedder?',
        answer:
          'An EVEMS (such as a DCC-12, SimpleSwitch, or Wallbox Power Meter) dynamically monitors real-time whole-home amperage via CT clamps. If total household demand approaches the main panel threshold, it automatically throttles or pauses EV charging, resuming full power once heavy appliances finish.',
      },
      {
        question: 'What size wire is required for 40-amp and 48-amp EV charger installations?',
        answer:
          'A 50A breaker (40A continuous draw) requires 6 AWG copper conductor wire. A 60A breaker (48A continuous draw) requires 4 AWG copper NM-B Romex or 6 AWG THHN copper wire in conduit rated for 75°C/90°C terminals, and must be direct-hardwired per NEC code.',
      },
      {
        question: 'Why do master electricians recommend direct hardwiring over NEMA 14-50 receptacles?',
        answer:
          'Hardwiring eliminates plug prong contact resistance, avoids thermal degradation and melting hazards associated with builder-grade receptacles under sustained continuous 40A loads, and eliminates nuisance tripping caused by double-GFCI breaker conflicts.',
      },
      {
        question: 'How do I calculate residential electrical load under NEC Article 220?',
        answer:
          'NEC Article 220 Optional Method (220.82) sums general lighting (3 VA/sq ft), two 1,500 VA small appliance circuits, nameplate ratings of fixed appliances (HVAC, dryer, range, water heater), applying a 40% demand factor to loads above 10 kVA, plus 125% of the EV charger continuous load.',
      },
    ],
  },
  preconditioning: {
    key: 'preconditioning',
    path: '/preconditioning',
    primaryKeyword: 'ev battery preconditioning calculator',
    title: 'EV Battery Preconditioning Calculator | Cold Gate vs Time',
    description:
      'Calculate if battery preconditioning saves net highway travel time. Compare energy spent heating the pack against minutes saved at DC fast chargers.',
    softwareName: 'EV Battery Thermal Preconditioning Net Time Sizer',
    breadcrumbName: 'Battery Preconditioning',
    imageCaption: 'Battery thermal preconditioning energy consumption vs DC fast charging time savings curve.',
    faqs: [
      {
        question: 'Does battery thermal preconditioning actually save net road trip travel time?',
        answer:
          'Yes. Warming a cold-soaked pack from 35°F to 85°F consumes 3 to 5 kWh of range (~12–18 miles) but accelerates 10%–80% fast charging from 55 minutes down to 20 minutes, yielding a net travel time savings of 20 to 35 minutes per stop.',
      },
      {
        question: 'What is cold-gating at DC fast charging stations?',
        answer:
          'Cold-gating occurs when low battery temperatures increase internal cell impedance. To prevent permanent metallic lithium plating and cell destruction, the vehicle BMS caps intake power to 40–55 kW rather than its 150–350 kW rated capability until the pack slowly self-heats.',
      },
      {
        question: 'Should I precondition if arriving at a charger with under 10% battery?',
        answer:
          'If your battery is below 10% state of charge, disable preconditioning to preserve range and avoid running out of battery before reaching the station. While initial charging will be slower, resistive Joule heating will warm the pack once plugged in.',
      },
      {
        question: 'How long before arriving at a fast charger should I trigger preconditioning?',
        answer:
          'In moderate cold (30°F to 45°F), navigate to the fast charger 20 to 35 minutes prior to arrival. In extreme sub-zero weather (<15°F / -10°C), heating a 500 kg battery mass can require 45 to 60 minutes of active highway thermal conditioning.',
      },
      {
        question: 'Why does preconditioning show high energy consumption on my dashboard?',
        answer:
          'Elevating hundreds of kilograms of battery cells, coolant, and aluminum plates from sub-freezing temperatures to 85°F requires 4 to 7 kWh of energy. High-voltage 5 kW to 9 kW PTC heaters or octovalve heat pumps draw significant power, but save substantial time at the charger.',
      },
      {
        question: 'How does battery preconditioning protect against lithium plating?',
        answer:
          'Preconditioning warms cell anodes to the optimal 75°F–90°F range, expanding the graphite lattice and lowering electrolyte viscosity. This allows lithium ions to insert smoothly without depositing as metallic dendrites, preserving long-term battery cycle life and health.',
      },
    ],
  },
  destinationCharging: {
    key: 'destinationCharging',
    path: '/destination-charging',
    primaryKeyword: 'hotel ev charger speed calculator',
    title: 'Hotel EV Charger Speed Calculator | Overnight Sizer Tool',
    description:
      'Calculate if hotel Level 2 destination chargers will fully recharge your EV overnight. Models 208V commercial voltage drop and eliminated morning stops.',
    softwareName: 'Hotel EV Destination Charger Speed Sizer',
    breadcrumbName: 'Hotel Destination Charging',
    imageCaption: 'Hotel 208V commercial 3-phase AC destination charging speeds and overnight refill calculations.',
    faqs: [
      {
        question: 'Why do hotel EV chargers charge slower than residential home Level 2 chargers?',
        answer:
          'Hotels and commercial facilities use 208V 3-phase electrical services rather than residential 240V split-phase power. At the same 32A current, 208V delivers 6.65 kW compared to 7.68 kW at home—an automatic 13.3% reduction in charging speed.',
      },
      {
        question: 'How does dual-pedestal power sharing affect overnight hotel charging times?',
        answer:
          'Shared commercial pedestals split circuit amperage when two vehicles plug in simultaneously. A shared 40A circuit provides 16A (3.3 kW) per car, extending full 10%–100% recharge times from 7.5 hours to 14+ hours until one car completes charging.',
      },
      {
        question: 'How many miles of range does a hotel destination charger add per hour?',
        answer:
          'A standard 208V 30A hotel pedestal adds 18 to 22 miles of range per hour. Over an 8 to 10-hour overnight stay, it delivers 150 to 220 miles of driving range (48 to 65 kWh), ensuring a full battery for morning departure.',
      },
      {
        question: 'Can relying on hotel destination charging reduce total road trip travel costs?',
        answer:
          'Yes. Recharging a 60–80 kWh battery pack overnight on complimentary or flat-rate hotel chargers saves $25 to $45 compared to highway DC fast charging sessions while eliminating 35 to 50 minutes of morning travel stops.',
      },
      {
        question: 'What adapters are needed to use hotel destination chargers on road trips?',
        answer:
          'Carrying both a NACS-to-J1772 adapter and a J1772-to-NACS adapter ensures compatibility with both Tesla Destination Chargers and standard universal Level 2 pedestals (ChargePoint, Blink, FLO, ClipperCreek) at hotels nationwide.',
      },
      {
        question: 'What is proper hotel EV charging etiquette if all stalls are occupied?',
        answer:
          'Check in on PlugShare, leave a courteous dashboard note with your contact number, lock your charge port if supported, and move your vehicle promptly once fully charged in the morning to free the pedestal for other guests.',
      },
    ],
  },
  v2hBackup: {
    key: 'v2hBackup',
    path: '/v2h-backup',
    primaryKeyword: 'how long can an ev power my house calculator',
    title: 'EV V2H Backup Calculator | How Long Can an EV Power House',
    description:
      'Calculate how many days your electric vehicle can power your home during an electrical blackout. Models Ford Lightning, Cybertruck, GM Ultium, and Ioniq 5 V2H run times.',
    softwareName: 'EV Vehicle-to-Home (V2H) Emergency Power Sizer',
    breadcrumbName: 'V2H Home Emergency Power',
    imageCaption: 'Vehicle-to-Home (V2H) bidirectional discharge duration modeling powering critical residential loads.',
    faqs: [
      {
        question: 'How long can an EV power my house during a power outage?',
        answer:
          'A typical 77 kWh to 131 kWh EV battery can power essential household circuits (refrigerator, LED lighting, Wi-Fi router, medical CPAP, and gas furnace blower) consuming 8–12 kWh/day for 6 to 14 consecutive days. Under whole-home loads with heat pumps (25–35 kWh/day), an EV provides 2.5 to 4.5 days of continuous power.',
      },
      {
        question: 'What is the difference between Vehicle-to-Load (V2L) and Vehicle-to-Home (V2H)?',
        answer:
          'V2L (Vehicle-to-Load) provides standalone 120V/240V AC outlets on the car delivering 1.8 kW to 3.6 kW to run specific appliances via extension cords. V2H (Vehicle-to-Home) integrates directly with your home main electrical panel via a bidirectional inverter and automatic transfer switch to energize whole-house circuits at 7.2 kW to 11.5 kW.',
      },
      {
        question: 'Can an EV battery with V2H run a central air conditioner or heat pump?',
        answer:
          'Yes, provided the bidirectional inverter output (e.g., 9.6 kW on Ford F-150 Lightning, 11.5 kW on Tesla Cybertruck Powershare, or 10.2 kW on GM Energy) meets the running wattage. For older single-stage compressors, installing an HVAC soft-starter (Micro-Air EasyStart) reduces locked rotor inrush current by up to 70%, preventing inverter trip-outs.',
      },
      {
        question: 'Does bidirectional V2H discharge damage or void the vehicle battery warranty?',
        answer:
          'No. Automakers with native V2H and V2L architecture (including Ford, Tesla, GM, Hyundai, Kia, and Nissan) officially cover bidirectional discharge under their standard 8-year / 100,000-mile high-voltage battery warranties. Discharging 10 kWh/day creates minimal electrochemical stress (~0.1 C-rate), equivalent to driving just 30 gentle miles.',
      },
      {
        question: 'How does an EV compare to a Tesla Powerwall or home standby generator?',
        answer:
          'A single EV battery pack (75 to 205 kWh) holds the equivalent energy of 5 to 15 stationary Tesla Powerwalls (13.5 kWh each) at a fraction of the cost per kWh. Compared to fossil fuel generators, V2H produces zero toxic carbon monoxide exhaust, operates at 0 dB silent volume, and requires zero gasoline storage or oil changes.',
      },
      {
        question: 'Can rooftop solar recharge an EV during an extended blackout using V2H microgrid forming?',
        answer:
          'Yes. With a microgrid-forming V2H gateway (such as Tesla Powershare Gateway, Ford Home Integration System, or Enphase IQ Bidirectional EV Charger), the system establishes an isolated 60 Hz reference voltage. This black-starts rooftop solar inverters during an outage, charging the EV from solar by day and powering the home by night for indefinite grid independence.',
      },
    ],
  },
};

/**
 * Generate standard Next.js Metadata for any tool route
 */
export function getToolMetadata(toolKey: ToolKey): Metadata {
  const config = SEO_CONFIG[toolKey];
  const fullUrl = `${BASE_URL}${config.path === '/' ? '' : config.path}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      absolute: config.title,
    },
    description: config.description,
    keywords: [config.primaryKeyword, 'ev charging calculator', 'electric vehicle analytics', 'ev charge curve'],
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: fullUrl,
      siteName: 'EVChargeCurve',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/icon.png`,
          width: 512,
          height: 512,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [`${BASE_URL}/icon.png`],
    },
  };
}

/**
 * Generate merged JSON-LD Schema (SoftwareApplication, ImageObject, BreadcrumbList, FAQPage)
 */
export function getToolStructuredData(toolKey: ToolKey): object {
  const config = SEO_CONFIG[toolKey];
  const fullUrl = `${BASE_URL}${config.path === '/' ? '' : config.path}`;
  const breadcrumbName = config.breadcrumbName || config.softwareName;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: config.softwareName,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        url: fullUrl,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: config.description,
      },
      {
        '@type': 'ImageObject',
        contentUrl: `${BASE_URL}/icon.png`,
        name: config.softwareName,
        caption: config.imageCaption,
        description: config.imageCaption,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement:
          config.path === '/'
            ? [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: BASE_URL,
                },
              ]
            : [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: BASE_URL,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: breadcrumbName,
                  item: fullUrl,
                },
              ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: config.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
