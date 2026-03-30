# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/users-list/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Error messages or screenshots (if applicable)
   - Your environment details (OS, Node version, npm version)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **JavaScript (ES6+)** for both client and server
- **React.js** for the frontend
- **Node.js/Express** for the backend
- **ESLint** for code quality

Before submitting:
```bash
# Server
cd server
npm install
npm start  # Test the server

# Client
cd client
npm install
npm start  # Test the client
```

### Coding Standards

#### Server (Node.js)
1. Follow the existing Express routing patterns
2. Use async/await for asynchronous operations
3. Include proper error handling and validation
4. Use Winston for logging
5. Follow RESTful API conventions

#### Client (React)
1. Use React class components (existing pattern)
2. Maintain clear component structure
3. Keep styles in separate LESS files
4. Use PropTypes for type checking
5. Handle loading and error states properly

### Adding New Features

#### Server Features
When adding new server features:
1. Add routes in `server/routes/`
2. Add business logic in `server/core/`
3. Add validation utilities in `server/utils/`
4. Update API documentation
5. Test with REST client (Postman, Insomnia)

#### Client Features
When adding new client features:
1. Create components in `client/src/components/`
2. Add containers in `client/src/containers/`
3. Update routing if needed
4. Add appropriate styling
5. Test responsiveness

### WebSocket Integration

When working with WebSocket features:
1. Follow the existing Socket.IO patterns
2. Emit events from server via `io.emit()`
3. Listen to events in client components
4. Handle connection/disconnection gracefully
5. Test real-time functionality

### Testing

- Test infinite scroll functionality
- Verify pagination works correctly
- Test WebSocket real-time updates
- Check error handling and edge cases
- Verify responsive design on different screen sizes

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏
