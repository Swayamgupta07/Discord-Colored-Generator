# Discord Colored Text Generator

A web-based tool to generate colored and styled text for Discord using ANSI escape codes. Create custom text with foreground colors, background colors, bold, and underline styles, and copy the formatted text to use directly in Discord.

![Discord Colored Text Generator](https://via.placeholder.com/800x400.png?text=Discord+Colored+Text+Generator+Screenshot)

## Live Demo

Try the app live at: [https://discord-colored-text-generator-49e7txa51.vercel.app](https://discord-colored-text-generator-49e7txa51.vercel.app)

## Features

- **Colorful Text**: Apply foreground (FG) and background (BG) colors to your text using ANSI color codes.
- **Text Styles**: Add bold and underline styles to your text.
- **Discord Compatible**: Copy the generated text in a Discord-compatible format (using ANSI escape codes wrapped in code blocks).
- **Interactive UI**: Select text in the textarea and apply styles with a single click.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Reset Option**: Reset the textarea to the default styled text with a single button.

## Screenshots
![image](https://github.com/user-attachments/assets/7de65c66-11d9-4980-926b-2b23487c5535)

## Installation

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Swayamgupta07/Discord-Colored-Generator.git
   cd Discord-Colored-Generator
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the app running locally.

## Usage

1. **Open the App**:
   - Visit the live demo at [https://discord-colored-text-generator-49e7txa51.vercel.app](https://discord-colored-text-generator-49e7txa51.vercel.app) or run it locally as described above.

2. **Create Styled Text**:
   - Type or edit text in the textarea.
   - Select the text you want to style.
   - Use the buttons to apply styles:
     - **Reset All**: Reset the textarea to the default styled text.
     - **Bold & Underline**: Apply bold or underline styles.
     - **FG (Foreground)**: Choose a foreground color (e.g., Red, Gold, Light Blue).
     - **BG (Background)**: Choose a background color (e.g., Blurple, Cream White).

3. **Copy to Discord**:
   - Click the **"Copy text as Discord formatted"** button to copy the text in a Discord-compatible format.
   - Paste the copied text into a Discord message to see the styled result.

## Deployment

You can deploy this app to Vercel in just a few steps.

### Deploy to Vercel

1. **Sign Up for Vercel**:
   - Go to [Vercel](https://vercel.com) and sign up using your GitHub account.

2. **Create a New Project**:
   - In the Vercel dashboard, click **Add New > Project**.
   - Import your `Discord-Colored-Generator` repository from GitHub.

3. **Configure and Deploy**:
   - Vercel will automatically detect that this is a Next.js project and configure the settings.
   - Click **Deploy** to deploy your app.
   - Once deployed, Vercel will provide a public URL (e.g., `https://discord-colored-text-generator-49e7txa51.vercel.app`).

4. **Automatic Redeployments**:
   - Vercel will automatically redeploy your app whenever you push new changes to the main branch on GitHub.

## Technologies Used

- **Next.js**: React framework for building the app.
- **React**: JavaScript library for building the user interface.
- **TypeScript**: For type-safe JavaScript development.
- **Mantine**: UI component library for buttons, tooltips, and layout.
- **CSS**: Custom styles for the app (in `globals.css`).
- **Vercel**: Hosting and deployment platform.
- **GitHub**: Version control and repository hosting.

## Contributing

Contributions are welcome! If you’d like to contribute to this project, please follow these steps:

1. **Fork the Repository**:
   - Click the **Fork** button on the GitHub repository page to create a copy of the repository under your GitHub account.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/Discord-Colored-Generator.git
   cd Discord-Colored-Generator
   ```

3. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**:
   - Implement your feature or bug fix.

5. **Commit and Push**:
   ```bash
   git add .
   git commit -m "Add your feature or fix"
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**:
   - Go to your forked repository on GitHub and click **New Pull Request**.
   - Submit the pull request to the `main` branch of the original repository.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

- **Author**: Swayam Gupta  
- **GitHub**: [Swayamgupta07](https://github.com/Swayamgupta07)  
- **Email**: swayamgupta09@gmail.com

