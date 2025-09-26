# IDSS Panel Layout Update

## Plan Overview
Update the IDSS panel layout to be more aesthetic and positioned in the bottom-right corner with smooth animations and collapsible functionality.

## Implementation Steps

### 1. Update IDSSPage.tsx
- [ ] Change from regular div layout to fixed positioning in bottom-right corner
- [ ] Add smooth entrance animation (slide-up with fade-in)
- [ ] Make panel collapsible/minimizable with minimize/maximize button
- [ ] Add proper z-index and spacing from taskbar (16px/1rem)
- [ ] Make responsive with max-width constraints (400-500px)
- [ ] Add state management for panel visibility

### 2. Update OptimizationPanel.tsx
- [ ] Adjust sizing to fit the new layout
- [ ] Ensure proper spacing and padding
- [ ] Maintain all existing functionality

### 3. Test Changes
- [ ] Verify the new positioning and animations
- [ ] Test responsive behavior on different screen sizes
- [ ] Test collapsible functionality
- [ ] Confirm all button actions work correctly
- [ ] Ensure no overlap with taskbar or other UI components

## Behavior Preservation
- [ ] Keep applySuggestion() function exactly as implemented
- [ ] Maintain POST request to /api/idss/apply
- [ ] Preserve notification system
- [ ] Keep loading states and error handling
