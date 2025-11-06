# AI usage

- Figma Make to prototype UI from this plan
- GitHub Copilot to auto-complete functions/ask questions/scaffold tests

# Functional requirements

- Y [Required] FE User can scan QR code using their mobile
- Maybe? (takes to confirmation screen, no DB record) [Required] BE Record that user checked in
- Y [Required] FE Display feedback to user that they have been given access.
  - [Backlog]: Confirmation screen could show unique code for staff to double check (given by server, could or could not allow staff to know who the authorized user is)
    Y - [UX-Improvement]: Confirmation screen can show features of the facility with current data
- Y [Required] FE Must provide fallback way to enter facility ID
- Y [Required] FE is a PWA (e.g. can be installed to home page)
- Y [Testing] A quick API route to generate QR codes for facilities
  - generateStaticPaths => [facility IDs]
  - facilities/[facilityId]/code => QR Code
- [Backlog] Show list of facilities near me (using Geolocation)

# Non-functional requirements

- FE is mobile responsive

## Check in process

- BE verifies required data was passed (using Zod)
- BE verifies facility ID exists (check in can be further restricted, e.g. by geolocation)
- BE verifies user has access to facility
- BE approves check in and issues a confirmation code
- FE displays confirmation screen with unique code that can be shown to staff
  - Unique code retention can be short lived or long lived. Facilities may want to analyse check ins over time for groups of users, etc
- FE could show a history of check ins

# Potentials for improvenent/decisions

- Better feedback and UX as user interacts with app
  - More obvious loading states
  - Maybe a toast saying "checking you in", "successful check in", etc
  - Confirmation code checked by BE against issued codes before rendering confirmation page
- Check in confirmation code could be set to anonymous or non-anonymous for staff to authenticate a check in
  - criteria to authenticate:
    - is code for current facility?
    - is check in recent enough (e.g. last 3 hours)?
- Check in could be restricted by user's geolocation
  - Say if you're within 1km of the facility you can check-in with the QR code.
    - QR code and manual codes can rotate daily on a screen
- Error handling
  - When checking in fails
  - When user is not authorized to use facility
  - When facility code doesn't match a facility (maybe the facility is no longer with FP)
- Should it work offline?
  - Do facilities want to verify that a user is authorized to enter?
    - If yes:
      - Needs internet connection to talk to BE
      - Needs to show user feedback saying need internet connectivity (navigator.online API)
    - If not:
      - Need a way for FE to verify that QR code is related to FP facilities, then be able to show a confirmation screen without a confirmation code and such
- facilities QR code generator may need to handle cases where some facilitites info fields are missing
