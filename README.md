# Error Message Design System

A comprehensive collection of user-friendly error message designs for Next.js applications using TypeScript, Tailwind CSS, and shadcn/ui components.

![Error Message Design System](https://placeholder.svg?height=400&width=800)

## Overview

This project demonstrates three different approaches to error message design in web applications, each implemented in a realistic user scenario. The goal is to provide developers with patterns for creating error messages that are informative, user-friendly, and reduce frustration.

## Features

- **Three distinct error scenarios:**
  - Form validation errors (sign-up form)
  - Critical errors (payment processing)
  - Status-based errors (network connectivity)
  
- **Interactive components** that demonstrate real-world error states
  
- **Responsive designs** that work across device sizes
  
- **Accessibility-focused** error messaging
  
- **Built with modern technologies:**
  - Next.js 14+ (App Router)
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Zod validation

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/error-message-design-system.git

# Navigate to the project directory
cd error-message-design-system

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Error Design Patterns

### 1. Form Validation Errors

![Form Validation Errors](https://placeholder.svg?height=300&width=600)

The sign-up form demonstrates inline field-level validation with contextual error messages:

- Real-time validation as users type or blur fields
- Visual indicators (red/green borders and icons) to show field status
- Specific error messages that explain exactly what's wrong
- Structured error lists for complex validation rules
- Success indicators when fields pass validation

**Best for:** Forms where users need immediate feedback to correct their input.

```tsx
// Example usage
<SignupErrorScenario />
```

### 2. Payment Processing Errors

![Payment Processing Errors](https://placeholder.svg?height=300&width=600)

The payment form uses a modal dialog for critical payment failures:

- Clean payment form with formatting helpers
- Modal error dialog that appears after a failed payment attempt
- Visual error icon to immediately communicate the error state
- Detailed error explanation with an error code for reference
- Multiple action options (try again or use a different payment method)

**Best for:** Critical errors that require immediate attention and potentially block the user's progress.

```tsx
// Example usage
<PaymentErrorScenario />
```

### 3. Network Connectivity Errors

![Network Connectivity Errors](https://placeholder.svg?height=300&width=600)

The network error shows a status-based error with automatic recovery:

- Status indicator that changes color and icon based on connection state
- Animated reconnection progress to show active recovery attempts
- Contextual messaging that changes based on the current status
- Manual reconnect option when automatic attempts fail
- Content availability tied to connection status

**Best for:** Background errors that may resolve themselves but still need to be communicated to the user.

```tsx
// Example usage
<NetworkErrorScenario />
```

## Design Principles

This error message design system follows these key principles:

1. **Be specific** - Provide clear information about what went wrong
2. **Be helpful** - Offer guidance on how to resolve the issue
3. **Be contextual** - Place errors where they're most relevant
4. **Be consistent** - Use similar patterns for similar types of errors
5. **Be empathetic** - Acknowledge the user's frustration without being condescending
6. **Be accessible** - Ensure errors are perceivable through multiple channels (visual, text, etc.)

## Technical Implementation

### Form Validation with Zod

The sign-up form uses Zod for schema validation:

```tsx
const baseSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
})

const signupSchema = baseSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
```

### Modal Dialogs with shadcn/ui

The payment error uses shadcn/ui's Dialog component:

```tsx
<Dialog open={showError} onOpenChange={setShowError}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-6 w-6 text-red-600" />
      </div>
      <DialogTitle className="text-center pt-4">Payment Failed</DialogTitle>
      <DialogDescription className="text-center">
        We were unable to process your payment
      </DialogDescription>
    </DialogHeader>
    {/* Error content */}
  </DialogContent>
</Dialog>
```

### Status-Based UI with Tailwind

The network error uses Tailwind's conditional classes:

```tsx
<div
  className={cn(
    "transition-all duration-300 ease-in-out",
    status === "disconnected"
      ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
      : status === "reconnecting"
        ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800"
        : "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
    "rounded-lg border p-4",
  )}
>
  {/* Status content */}
</div>
```

## Customization

### Theming

The error messages use Tailwind CSS for styling and can be customized by modifying the color classes. For example, to change the error color from red to purple:

```tsx
// Before
<div className="text-red-500 border-red-200 bg-red-50">

// After
<div className="text-purple-500 border-purple-200 bg-purple-50">
```

### Component Props

Each error component accepts props to customize the content:

```tsx
// SignupErrorScenario doesn't currently accept props but could be extended

// PaymentErrorScenario
<PaymentErrorScenario 
  errorCode="INSUFFICIENT_FUNDS"
  errorMessage="Your card was declined due to insufficient funds."
/>

// NetworkErrorScenario
<NetworkErrorScenario
  autoReconnect={true}
  reconnectInterval={5000}
/>
```

## Accessibility Considerations

This design system implements several accessibility features:

- **Color is not the only indicator** - Icons and text reinforce error states
- **Error messages are associated with their inputs** - Using proper labeling
- **Focus management** - Especially in the modal error dialog
- **Screen reader support** - With appropriate ARIA attributes
- **Keyboard navigation** - All interactive elements are keyboard accessible

## Browser Compatibility

The error message design system is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-error`)
3. Commit your changes (`git commit -m 'Add some amazing error'`)
4. Push to the branch (`git push origin feature/amazing-error`)
5. Open a Pull Request

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Zod](https://github.com/colinhacks/zod) for schema validation
- [Lucide React](https://lucide.dev/) for the icons

---

Created with ❤️ by karlosM1
