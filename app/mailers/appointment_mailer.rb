class AppointmentMailer < ActionMailer::Base
  default from: 'notifications@whizium.com'
  
  def appointment_proposal(proposer, target)
    @target = target
    @proposer = proposer
    
    mail(:to => "#{@target.name} <#{@target.email}>", :subject => "#{@proposer.name} would like to speak with you")
  end
  
  def appointment_confirmation(proposer, target, appointment)
    @target = target
    @proposer = proposer
    @appointment = appointment
    
    mail(:to => "#{@target.name} <#{@target.email}>", :subject => "Congratulations! Your appointment with #{@proposer.name} has been booked!")
    mail(:to => "#{@proposer.name} <#{@proposer.email}>", :subject => "Congratulations! Your appointment with #{@target.name} has been booked!")
  end
end
