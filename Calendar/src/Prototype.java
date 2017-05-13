/**
 * Created by Nathan on 5/12/2017.
 */
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

class DatePicker {
    int month = java.util.Calendar.getInstance().get(java.util.Calendar.MONTH);
    int year = java.util.Calendar.getInstance().get(java.util.Calendar.YEAR);
    JLabel l = new JLabel("", JLabel.CENTER);
    String day = "";
    JDialog d;
    JButton[] button = new JButton[49];

    public DatePicker(JFrame parent) {
        d = new JDialog();
        d.setModal(true);
        String[] header = { "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat" };
        JPanel p1 = new JPanel(new GridLayout(7, 7));
        p1.setPreferredSize(new Dimension(700, 700));

        for (int x = 0; x < button.length; x++) {
            final int selection = x;
            button[x] = new JButton();
            button[x].setFocusPainted(false);
            button[x].setBackground(Color.lightGray);
            if (x > 6){
                button[x].addActionListener(new ActionListener() {
                    public void actionPerformed(ActionEvent ae) {
                        day = button[selection].getActionCommand();
                        d.dispose();
                    }
                });
        }
            if (x < 7) {
                button[x].setText(header[x]);
                button[x].setForeground(Color.red);
            }
            p1.add(button[x]);
        }
        JPanel p2 = new JPanel(new GridLayout(1, 3));
        JButton previous = new JButton("<< Previous");
        previous.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae) {
                month--;
                displayDate();
            }
        });
        p2.add(previous);
        p2.add(l);
        JButton next = new JButton("Next >>");
        next.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae) {
                month++;
                displayDate();
            }
        });
        p2.add(next);
        d.add(p1, BorderLayout.CENTER);
        d.add(p2, BorderLayout.SOUTH);
        d.pack();
        d.setLocationRelativeTo(parent);
        displayDate();
        d.setVisible(true);
    }

    public void displayDate() {
        for (int x = 7; x < button.length; x++)
            button[x].setText("");
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(
                "MMMM yyyy");
        java.util.Calendar cal = java.util.Calendar.getInstance();
        cal.set(year, month, 1);
        int dayOfWeek = cal.get(java.util.Calendar.DAY_OF_WEEK);
        int daysInMonth = cal.getActualMaximum(java.util.Calendar.DAY_OF_MONTH);
        for (int x = 6 + dayOfWeek, day = 1; day <= daysInMonth; x++, day++)
            button[x].setText("" + day);
        l.setText(sdf.format(cal.getTime()));
        d.setTitle("Date Picker");
    }

    public String setPickedDate() {
        if (day.equals(""))
            return day;
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(
                "dd-MM-yyyy");
        java.util.Calendar cal = java.util.Calendar.getInstance();
        cal.set(year, month, Integer.parseInt(day));
        return sdf.format(cal.getTime());
    }
}

class Picker {
    JButton[] time = new JButton[24];
    JLabel label = new JLabel("Date:");
    final JTextField text = new JTextField("Please select a Date", 20);
    JButton b = new JButton("Back to Monthly View");
    JButton b2 = new JButton("Add Event");
    JDialog d;
    String hour = "";
    public Picker(JFrame parent) {

        JPanel p = new JPanel(new GridLayout(24, 1));
        p.setPreferredSize(new Dimension(500, 800));
        p.add(label);
        p.add(text);
        p.add(b);
        p.add(b2);

        d = new JDialog();
        d.setModal(true);

        for (int x = 0; x < time.length; x++) {
            final int selection = x;
            time[x] = new JButton();
            time[x].setFocusPainted(false);
            time[x].setBackground(Color.lightGray);

                time[x].addActionListener(new ActionListener() {
                    public void actionPerformed(ActionEvent ae) {
                        hour = time[selection].getText();
                        d.dispose();
                    }
                });
            time[x].setText(setTime(x));
            time[x].setForeground(Color.BLUE);
            p.add(time[x]);
        }
        final JFrame f = new JFrame();
        f.getContentPane().add(p);
        f.pack();
        f.setVisible(true);
        b.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae) {
                text.setText(new DatePicker(f).setPickedDate());
            }
        });
        d.add(p, BorderLayout.CENTER);
        d.pack();
        d.setLocationRelativeTo(parent);
        d.setVisible(true);
    }
    public static String setTime(int x){
         StringBuilder sb = new StringBuilder(5);
         if (x<10) {
             sb.append("0");
             sb.append(x);
             sb.append(":00");
             return sb.toString();
         }
         else{
             sb.append(x);
             sb.append(":00");
             return sb.toString();
         }
    }
    public String setPickedTime() {
        if(hour.equals("00:00")) {
            return time[0].getText();
        }
        else if(hour.equals("01:00")) {
            return time[1].getText();
        }
        else if(hour.equals("02:00")) {
            return time[2].getText();
        }
        else if(hour.equals("03:00")) {
            return time[3].getText();
        }
        else if(hour.equals("04:00")) {
            return time[4].getText();
        }
        else if(hour.equals("05:00")) {
            return time[5].getText();
        }
        else if(hour.equals("06:00")) {
            return time[6].getText();
        }
        else if(hour.equals("07:00")) {
            return time[7].getText();
        }
        else if(hour.equals("08:00")) {
            return time[8].getText();
        }
        else if(hour.equals("09:00")) {
            return time[9].getText();
        }
        else if(hour.equals("10:00")) {
            return time[10].getText();
        }
        else if(hour.equals("11:00")) {
            return time[11].getText();
        }
        else if(hour.equals("12:00")) {
            return time[12].getText();
        }
        else if(hour.equals("13:00")) {
            return time[13].getText();
        }
        else if(hour.equals("14:00")) {
            return time[14].getText();
        }
        else if(hour.equals("15:00")) {
            return time[15].getText();
        }
        else if(hour.equals("16:00")) {
            return time[16].getText();
        }
        else if(hour.equals("17:00")) {
            return time[17].getText();
        }
        else if(hour.equals("18:00")) {
            return time[18].getText();
        }
        else if(hour.equals("19:00")) {
            return time[19].getText();
        }
        else if(hour.equals("20:00")) {
            return time[20].getText();
        }
        else if(hour.equals("21:00")) {
            return time[21].getText();
        }
        else if(hour.equals("22:00")) {
            return time[22].getText();
        }
        else if(hour.equals("23:00")) {
            return time[23].getText();
        }
        else {
        return "N/A";
        }
    }
}

class EventList {
    public static void main(String[] args) {
        JLabel label = new JLabel("Selected Date:");
        final JTextField text = new JTextField(20);
        JLabel label1 = new JLabel("Selected Time:");
        final JTextField text1 = new JTextField(20);
        JLabel label2 = new JLabel("Event Name:");
        final JTextField text2 = new JTextField(20);
        JLabel label3 = new JLabel("Event Location:");
        final JTextField text3 = new JTextField(20);
        JButton b = new JButton("Select a Date");
        JButton b2 = new JButton("Select a Time");
        JButton b3 = new JButton("Save");
        JPanel p = new JPanel(new GridLayout(7,1));

        p.add(label);
        p.add(text);
        p.add(label1);
        p.add(text1);
        p.add(label2);
        p.add(text2);
        p.add(label3);
        p.add(text3);

        p.add(b);
        p.add(b2);
        p.add(b3);

        final JFrame f = new JFrame();
        f.getContentPane().add(p);
        f.pack();
        f.setVisible(true);
        b.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae) {
                text.setText(new DatePicker(f).setPickedDate());
            }
        });
        b2.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae) {
                text1.setText(new Picker(f).setPickedTime());
            }
        });

    }
}
