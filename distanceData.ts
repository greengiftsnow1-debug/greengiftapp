// distanceData.ts
// Approximate distance in km from each store PIN to customer PIN.
// You can tweak these values anytime based on your real delivery experience.

export const distanceMap: Record<string, Record<string, number>> = {
  // 🟢 Store 1: Shubham Nursery Patel Nagar (462022)
  "462022": {
    // Very close / same belt
    "462022": 1,
    "462023": 4, // Govindpura
    "462024": 4, // HE Hospital
    "462021": 4, // Anand Nagar
    "462020": 5, // AIIMS
    "462026": 7, // Misrod / C21 side
    "462010": 7, // Nishatpura / Chandbad
    "462036": 10, // Gandhi Nagar
    

    // Old city & central
    "462001": 7,  // New Market / Hamidia / GPO
    "462003": 6,  // TT Nagar / South TT Nagar
    "462004": 7,  // Vallabh Bhawan / Satpura
    "462008": 7,  // Jahangirabad / Barkhedi
    "462011": 7,  // Arera Hills
    "462016": 7,  // E-2 / Shivaji Nagar / Mahaveer Nagar
    "462013": 8,  // Regional College

    // Kolar & Hoshangabad Road side
    "462042": 9,  // Kolar Road
    "462039": 9,  // Trilanga
    "462037": 9,  // Peoples Campus
    "462041": 11, // Ayodhya Nagar
    "462043": 11, // Bag Mungalia
    "462047": 12, // Misrod
    "462045": 13, // Bangrasia

    // Outer / rural-ish belt
    "462101": 18, // Gunga / rural side
    "462046": 16, // Mandideep
    "462044": 14, // Ratibad / Mungalia Chhap
    "462066": 14, // IISER Bhouri
    "462420": 22, // Around Gada Jangeer
  },

  // 🔵 Store 2: Shubham Nursery C21 Mall (462026)
  "462026": {
    // Very close / same belt
    "462026": 1,  // C21 / Bawadia Kalan / University
    "462039": 3,  // Trilanga
    "462042": 4,  // Kolar Road
    "462037": 4,  // Peoples Campus
    "462041": 6,  // Ayodhya Nagar
    "462043": 6,  // Bag Mungalia
    "462047": 6,  // Misrod
    "462045": 8,  // Bangrasia

    // BHEL / Govindpura / AIIMS side
    "462022": 7,  // Patel Nagar / BHEL
    "462023": 7,  // Govindpura
    "462024": 8,  // HE Hospital
    "462021": 8,  // Anand Nagar
    "462020": 7,  // AIIMS

    // Old city & central
    "462001": 9,  // New Market / Old city
    "462003": 8,  // TT Nagar
    "462004": 9,  // Vallabh Bhawan / Satpura
    "462008": 10, // Jahangirabad
    "462011": 8,  // Arera Hills
    "462016": 8,  // E-2 / Shivaji Nagar
    "462013": 9,  // Regional College
    "462010": 9,  // Nishatpura / Chandbad
    "462036": 11, // Gandhi Nagar

    // Outer belt
    "462066": 10, // IISER
    "462046": 18, // Mandideep
    "462044": 15, // Ratibad belt
    "462101": 22, // Gunga / outskirts
    "462420": 25, // Far rural side
  },
};
