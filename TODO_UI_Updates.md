# IDSS Panel UI Updates

## Plan Overview
Update the IDSS panel visual design with new color scheme and button positioning while preserving all existing functionality.

## Implementation Steps

### 1. Update OptimizationPanel.tsx
- [ ] Move "Apply Suggestion" button to the right side of recommendation cards
- [ ] Change button color to blue-green (#0ea5e9 with hover #0284c7)
- [ ] Make button text white and bold
- [ ] Update card background to whitish (#f8fafc)
- [ ] Add subtle shadow and rounded-2xl corners
- [ ] Update text color to text-gray-800 for better contrast
- [ ] Ensure responsive layout

### 2. Test Changes
- [ ] Verify button positioning and styling
- [ ] Confirm functionality remains intact
- [ ] Test responsive behavior

## Behavior Preservation
- [ ] Keep applySuggestion() function exactly as implemented
- [ ] Maintain POST request to /api/idss/apply
- [ ] Preserve notification system
- [ ] Keep loading states and error handling
